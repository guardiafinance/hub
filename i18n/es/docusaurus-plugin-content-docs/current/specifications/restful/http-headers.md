---
sidebar_position: 3
---

# Headers

Esta especificación describe los headers estándar y personalizados adoptados por Guardia en sus APIs RESTful.

Su objetivo es promover la consistencia entre interfaces, garantizar la previsibilidad en el consumo de datos y facilitar la interoperabilidad entre módulos internos, servicios externos e integraciones de socios.

La estandarización de headers contribuye a:
- Trazabilidad eficiente de solicitudes
- Depuración segura en entornos controlados
- Escalabilidad de las integraciones
- Cumplimiento de estándares de seguridad
- Mejor experiencia de desarrollo

Todos los headers DEBEN seguir el patrón de nomenclatura definido en esta especificación.

## Headers Estándar

| Header                                            | Tipo     | Categoría        | Dirección    | Obligatoriedad | Descripción                                              |
|---------------------------------------------------|----------|------------------|--------------|----------------|----------------------------------------------------------|
| [Accept](#accept)                                   | string   | estándar         | Request      | Opcional       | Formato de respuesta aceptado.                           |
| [Accept-Language](#accept-language)                 | string   | estándar         | Request      | Opcional       | Idioma preferido.                                        |
| [Content-Type](#content-type)                       | string   | estándar         | Ambos        | Opcional       | Formato del contenido.                                   |
| [Content-Language](#content-language)               | string   | estándar         | Response     | Opcional       | Idioma de la respuesta.                                  |
| [Cache-Control](#cache-control)                     | string   | estándar         | Response     | Opcional       | Direcciones para el control de caché.                    |
| [Link](#link)                                       | string   | estándar         | Response     | Opcional       | Enlaces para la paginación o el estado de las entidades. |
| [Idempotency-Key](#idempotency-key)                | string   | estándar         | Ambos        | Opcional       | Clave de idempotencia.                                   |
| [Content-Digest](#content-digest)                   | string   | estándar         | Response     | Opcional       | Hash del payload.                                        |
| [Last-Modified](#last-modified)                     | timestamp| estándar         | Response     | Opcional       | Fecha de última modificación.                            |
| [Retry-After](#retry-after)                         | integer  | estándar         | Response     | Opcional       | Tiempo en segundos para esperar antes de reintentar la solicitud. |

---

### Accept

El header `Accept` DEBE ser usado para especificar el formato de respuesta aceptado por el cliente.

#### Ejemplos de uso

```http
Accept: application/vnd.guardia.v1+json
```

---

### Accept-Language

El header `Accept-Language` DEBE ser usado para especificar el idioma preferido por el cliente.

#### Ejemplos de uso

```http
Accept-Language: es
```

---

### Content-Type

El header `Content-Type` DEBE ser usado para especificar el formato del contenido de la solicitud y la respuesta.

#### Ejemplos de uso

```http
Content-Type: application/vnd.guardia.v1+json
```

---

### Content-Language

El header `Content-Language` DEBE ser usado para especificar el idioma de la respuesta. DEBE retornar el valor solicitado a través del header `Accept-Language` de la solicitud.

#### Ejemplos de uso

```http
Content-Language: es
```

---

### Cache-Control

El header `Cache-Control` DEBE ser usado para guiar los mecanismos de caché tanto en solicitudes como en respuestas.

#### Respuesta

El caché DEBE ser configurado con la directiva `max-age=<seconds>`, precedida por:

- `public`, cuando el caché puede ser compartido entre múltiples usuarios:

```http
Cache-Control: public, max-age=<seconds>
```

- `private`, cuando el caché es exclusivo del usuario final:

```http
Cache-Control: private, max-age=<seconds>
```

Para respuestas que NO DEBEN ser almacenadas en caché:

```http
Cache-Control: no-store
```

Otras directivas PUEDEN ser añadidas según sea necesario, siguiendo [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111#section-5.2).

---

### Link

El header `Link` PUEDE ser usado para proporcionar enlaces para paginación o estado de entidades, siguiendo las directivas [HATEOAS](https://restfulapi.net/hateoas).

#### Paginación

```http
link:
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={next_page_token}>; rel="next",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={last_page_token}>; rel="last",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={first_page_token}>; rel="first"
```

#### Estado de Entidad

```http
Link: <https://{tenant_id}.guardia.finance/api/v1/ledgers/{entity_id}>; rel="ledger"
```

---

### Idempotency-Key

El header `Idempotency-Key` DEBE ser usado para identificar una solicitud idempotente.

```http
Idempotency-Key: <uuid>
```

#### Validación

- DEBE ser usado según la [especificación de idempotencia](../idempotency.md#implementación-en-apis).

---

### Content-Digest

El encabezado `Content-Digest` DEBE ser utilizado para proporcionar el hash del payload de la solicitud en una solicitud idempotente.

```http
Content-Digest: sha-256=<hash>
```

#### Validación

- DEBE ser utilizado conforme [especificación de idempotencia](../idempotency.md#implementación-en-apis).
- El algoritmo DEBE ser `sha-256`.
- El hash DEBE ser calculado sobre el payload JSON de la solicitud, después de la serialización y antes de cualquier compresión.
- El hash DEBE ser representado en hexadecimal, en minúsculas, sin prefijo (ej: `0x`).
- El hash DEBE tener exactamente 64 caracteres.
- El hash DEBE ser calculado después de la normalización del JSON (eliminación de espacios en blanco, ordenación de propiedades).
- El hash DEBE ser recalculado y validado en cada solicitud idempotente.
- En caso de fallo en la validación, el sistema DEBE retornar `400 Bad Request` con código `ERR400_MISSING_OR_MALFORMED_HEADER` y motivo `INVALID_CONTENT_DIGEST`.

#### Ejemplos

```http
Content-Digest: sha-256=2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

---

### Last-Modified

El header `Last-Modified` DEBE ser usado para proporcionar la fecha de última modificación de la entidad.

```http
Last-Modified: <http-date>
```

#### Validación

- DEBE ser un valor válido de fecha y hora según [RFC 7232](https://datatracker.ietf.org/doc/html/rfc7232#autoid-6).
- DEBE ser usado según la [especificación de idempotencia](../idempotency.md#implementación-en-apis).

---

### Retry-After

El header `Retry-After` DEBE ser retornado en caso de error 429 (Too Many Requests) para indicar el tiempo en segundos para esperar antes de reintentar la solicitud.

```http
Retry-After: <seconds>
```

#### Validación

- DEBE ser un valor entero positivo.

## Headers Personalizados

Los headers personalizados utilizados por Guardia siguen la convención del prefijo `X-Grd-*`. Abordan necesidades específicas de trazabilidad y correlación entre sistemas.

| Header                                            | Tipo     | Categoría        | Dirección    | Obligatoriedad | Descripción                                               |
|---------------------------------------------------|----------|------------------|--------------|----------------|-----------------------------------------------------------|
| [X-Grd-Debug](#x-grd-debug)                       | booleano | personalizado    | Request      | Opcional       | Bandera para habilitar el modo de depuración.             |
| [X-Grd-Trace-Id](#x-grd-trace-id)                 | uuid     | personalizado    | Response     | Obligatorio    | Identificador único de la solicitud para la trazabilidad. |
| [X-Grd-Correlation-Id](#x-grd-correlation-id)     | uuid     | personalizado    | Ambos        | Opcional       | Identificador de correlación para llamadas distribuidas.  |

---

### X-Grd-Debug

Header booleano opcional. Cuando está presente con el valor `true`, la respuesta DEBE incluir la propiedad `debug` en el payload, conteniendo información adicional según la [especificación de payloads de respuesta](./http-response-payloads.md#debug).

```http
X-Grd-Debug: true
```

#### Validación
- DEBE aceptar solo los valores `true` o `false` (sin distinción de mayúsculas/minúsculas)
- Cualquier otro valor DEBE resultar en `400 Bad Request` con el codigo `ERR400_MISSING_OR_MALFORMED_HEADER` y el motivo `INVALID_DEBUG_HEADER_VALUE`
- El uso en entornos de producción DEBE ser controlado por:
  - Ámbito de permiso específico
  - Tiempo máximo de uso restringido a 10 minutos por cliente
  - Límite de 10 solicitudes por minuto
  - Intervalo de uso restringido a al menos 1 minuto entre solicitudes
  - Registro de auditoría de uso

---

### X-Grd-Trace-Id

Header obligatorio devuelto en todas las respuestas de las APIs de Guardia. Representa el identificador único de la solicitud.

- DEBE ser generado por la infraestructura de Guardia
- DEBE rastrear la solicitud y respuesta a través de todas las capas del sistema, incluyendo eventos de dominio y notificaciones por webhooks
- El valor DEBE seguir el estándar UUIDv7, con marcación temporal según lo especificado en [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7)

```http
X-Grd-Trace-Id: <uuid>
```

#### Validación
- DEBE ser un UUIDv7 válido
- DEBE incluirse en todas las respuestas, incluyendo errores

---

### X-Grd-Correlation-Id

Header opcional enviado por sistemas externos. Utilizado para propagar el contexto de seguimiento a lo largo de llamadas distribuidas.

- Si está presente en la solicitud, DEBE ser incluido en la respuesta
- Si está presente en la solicitud, DEBE ser propagado a través de todas las capas del sistema, incluyendo eventos de dominio y notificaciones por webhooks
- El valor DEBE seguir el estándar propuesto por [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562)

```http
X-Grd-Correlation-Id: <uuid>
```

#### Validación
- Si está presente, DEBE ser un UUID válido
- Si es inválido, DEBE ser ignorado y se DEBE generar un nuevo valor

---

## Consideraciones de Seguridad

- Los headers de seguimiento NO DEBEN contener:
  - Datos sensibles
  - Información PII (Información Personalmente Identificable)
  - Secretos o credenciales
  - Información confidencial de negocio
- Las solicitudes DEBEN ser validadas:
  - Independientemente del estado de autenticación
  - Considerando el contexto de seguridad del tenant
  - Respetando los límites de tasa configurados
- Los headers personalizados DEBEN:
  - Ser validados por tamaño máximo
  - Ser sanitizados para prevenir inyección de código
  - Ser limitados en cantidad por solicitud

## Notas adicionales

- Los headers utilizados en cada endpoint DEBEN ser documentados en el contrato OAS de la API
- Los headers aquí descritos son considerados el estándar mínimo para cualquier API RESTful de Guardia

## Referencias

- [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
- [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111)
- [RFC 7232: Conditional Requests](https://datatracker.ietf.org/doc/html/rfc7232)
- [Headers HTTP - HTTP | MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Headers)
- [HATEOAS](https://restfulapi.net/hateoas)
