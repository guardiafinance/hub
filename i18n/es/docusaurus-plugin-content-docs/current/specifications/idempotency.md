---
sidebar_position: 3
---

# Idempotencia

La idempotencia es una propiedad fundamental en sistemas distribuidos que garantiza que las operaciones repetidas con los mismos parámetros siempre producen el mismo resultado y no causan efectos secundarios adicionales.

En el contexto de Guardia, la idempotencia es esencial para preservar la consistencia de datos y garantizar la confiabilidad de las interacciones en APIs y en el procesamiento de eventos — especialmente en entornos sujetos a fallos de red, timeouts o políticas de reintento automáticas. Esta práctica mitiga riesgos como la duplicación de transacciones, inconsistencias de estado y efectos secundarios no deseados.

---

## Reglas Generales

### Principios Fundamentales

- Las operaciones idempotentes DEBEN producir el mismo resultado para múltiples ejecuciones con los mismos parámetros.
- La verificación de idempotencia NO DEBE depender exclusivamente de la clave de idempotencia.
- El control DEBE considerar la combinación de la clave y el hash del payload de la solicitud o evento.
- La clave de idempotencia:
  - DEBE ser proporcionada por el cliente.
  - DEBE ser única por operación y ámbito de ruta.
  - DEBE seguir el formato UUID, según [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).
- El hash DEBE ser generado con el algoritmo `SHA-256`.

### Almacenamiento y Validación

- El estado de idempotencia DEBE ser almacenado en un sistema de caché distribuido y resiliente.
- El tiempo de retención del estado DEBE ser de mínimo 2 horas y máximo 24 horas.
- El sistema DEBE validar:
  - Si la clave ha sido utilizada.
  - Si el hash del payload coincide con la ejecución anterior.

### Seguridad y Cumplimiento

- El estado de idempotencia DEBE ser almacenado de forma segura, en conformidad con las políticas de protección de datos.
- El acceso a estos datos DEBE ser auditado.
- Los intentos maliciosos de repetición con la misma clave DEBEN ser monitoreados y mitigados.
- Los logs de operaciones idempotentes DEBEN contener identificadores rastreables para análisis posterior.

### Dependencias Técnicas

- Almacenamiento distribuido para persistencia temporal del estado de la operación.
- Caché resiliente para respuestas rápidas y deduplicación.
- Mecanismos de auditoría y monitoreo continuo.

---

## Implementación en APIs

- Los endpoints que modifican estado (ej: `POST`, `PATCH`) DEBEN ser idempotentes.
- El encabezado `Idempotency-Key` DEBE ser obligatorio en estos endpoints.
- CUANDO no se proporcione, el sistema DEBE retornar `400 BAD REQUEST`, con código `ERR400_MISSING_OR_MALFORMED_HEADER` y motivo `IDEMPOTENCY_KEY_REQUIRED`.
- La respuesta DEBE incluir el mismo encabezado `Idempotency-Key` recibido en la solicitud y el `Content-Digest` con el hash del payload.
- La clave de idempotencia DEBE ser propagada por todas las capas del sistema, incluyendo eventos de dominio y notificaciones por webhooks.
- La primera ejecución DEBE almacenar:
  - El resultado de la operación.
  - El hash del payload.
  - La clave de idempotencia y timestamp.
- Solicitudes posteriores con la misma clave y hash del payload:
  - DEBE retornar el resultado original almacenado.
  - NO DEBE ejecutar la operación nuevamente.
  - DEBE incluir el encabezado `Last-Modified` con la fecha original de ejecución.
- CUANDO la clave ya esté registrada, PERO el hash del payload sea diferente:
  - El sistema DEBE rechazar la solicitud con error `409 CONFLICT`, código `ERR409_SERVER_STATE_CONFLICT` y motivo `CONFLICTING_IDEMPOTENT_REQUEST`.

---

## Implementación en Eventos

- Todos los eventos publicados por la plataforma DEBEN ser idempotentes.
- El campo `idempotencykey` DEBE estar presente en el payload, según [especificación de eventos](../specifications/cloud-events.md).
- El consumidor DEBE registrar el estado de ejecución basado en la clave y hash del evento.
- El evento DEBE ser considerado único por `idempotencykey`.
- Si un evento ya ha sido procesado:
  - El sistema DEBE ignorarlo y retornar ACK al broker.
  - NO DEBE reejecutar la lógica asociada.
  - La ejecución original PUEDE ser registrada en logs para fines de auditoría.

## Comportamientos Esperados

### En APIs

#### Primera Solicitud:
- La operación es procesada.
- El resultado es persistido con la clave y el hash del payload.
- Retorna 200 con payload y `Idempotency-Key`.

#### Solicitud Repetida con misma clave y hash del payload:
- Se retorna el resultado anterior.
- La operación NO es reejecutada.
- Retorna 200 y encabezado `Last-Modified`.

#### Solicitud con misma clave pero hash del payload diferente:
- El sistema RECHAZA con error `409 CONFLICT`.
- Debe retornar mensaje claro con código `ERR409_SERVER_STATE_CONFLICT` y motivo `CONFLICTING_IDEMPOTENT_REQUEST`.

### En Eventos

#### Primer Recibo:
- El evento es procesado normalmente.
- El resultado es persistido para deduplicación futura.
- El estado del sistema es alterado según regla de negocio.

#### Evento Duplicado:
- El evento es reconocido como ya procesado.
- La operación es ignorada.
- Se envía ACK al broker.
- Los logs PUEDEN indicar que se trataba de evento repetido.

## Cuándo Usar

La idempotencia DEBE ser aplicada:

- En cualquier operación que modifique el estado del sistema (APIs y eventos).
- En flujos críticos de negocio (ej: creación de transacciones, usuarios, contratos).
- En sistemas sujetos a fallos de red, replicaciones o timeouts.
- Siempre que el cliente o consumidor tenga política de reintento activa.

## Cuándo No Usar

La idempotencia NO DEBE ser aplicada:

- En operaciones puramente de lectura (ej: `GET`, eventos de consulta).
- En flujos que no generan efectos secundarios.
- En llamadas que, por definición, siempre deben producir resultado nuevo (ej: generación de UUID aleatorio, polling, etc).

## Referencias

- [Draft RFC The Idempotency-Key Header Field](https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-01.html)
- [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562)
