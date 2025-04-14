---
sidebar_position: 5
---

# Manejo de Errores

Esta especificación define el estándar para la representación, categorización y manejo de errores en la plataforma Guardia. El objetivo es garantizar consistencia, claridad y trazabilidad en la comunicación de errores entre servicios, consumidores de API e interfaces de usuario.

## Estructura del Payload de Error

Todos los errores DEBEN estar encapsulados en el campo `errors`, que DEBE ser un array de objetos, incluso cuando solo haya un error.

Cada objeto de error DEBE contener las siguientes propiedades:

| Propiedad  | Tipo   | Descripción                                                               |
| ---------- | ------ | ----------------------------------------------------------------------- |
| `code`     | string | Código semántico y descriptivo, en UPPER_SNAKE_CASE, único en el dominio. |
| `reason`   | string | Categoría semántica del error, utilizada para el manejo programático.    |
| `message`  | string | Descripción orientada al desarrollador, sin revelar detalles sensibles.  |

### Ejemplo de Payload

```json
{
  "errors": [
    {
      "code": "ERR402_INSUFFICIENT_FUNDS",
      "reason": "PAYMENT_IS_REQUIRED",
      "message": "Se requiere regularizar el pago para continuar con la operación."
    }
  ]
}
```

## Reglas Generales

### Códigos de Error (`code`)

- DEBEN ser únicos, en UPPER_SNAKE_CASE.
- DEBEN estar prefijados con ERR y el código HTTP (ej: `ERR400_...`).
- DEBEN seguir la consistencia con los códigos de estado HTTP correspondientes.

### Razón del Error (`reason`)

- DEBE ser una cadena en UPPER_SNAKE_CASE.
- DEBE indicar la causa específica y directa del error, con el objetivo de facilitar el diagnóstico técnico y el manejo programático.
- DEBE complementar el `code`, proporcionando contexto adicional sobre el origen del problema.
- PUEDE tener múltiples valores posibles de `reason` para el mismo `code`, variando según la situación.
- DEBEN estar listados en [Errores Conocidos](./known-errors.md).
- NO DEBE contener datos sensibles o rastros técnicos internos.

### Mensaje (`message`)

- DEBE ser descriptivo y orientado al desarrollador.
- NUNCA DEBE exponer información sensible o detalles técnicos internos.
- PUEDE ser internacionalizable mediante el encabezado `Accept-Language`.

## Reintento de Solicitudes

- Las condiciones para reintento DEBEN estar documentadas en [Errores Conocidos](./known-errors.md).
- Cuando sea aplicable, los errores DEBEN indicar si son elegibles para reintento e incluir el tiempo recomendado a través del encabezado `Retry-After`.
- Los clientes DEBEN aplicar backoff exponencial con base 2 cuando el tiempo no esté explícitamente indicado, hasta un máximo de 4 intentos.
- Después del 4º intento, los clientes DEBEN adoptar el patrón de circuit breaker para prevenir la sobrecarga del servicio.
  - El estado half-open del circuit breaker PUEDE ser probado cada 60 segundos.
- El número de intentos e intervalos DEBE ser configurable por el cliente, respetando los límites definidos por la plataforma.

## Creación de Nuevos Errores

- DEBEN seguir la estructura estandarizada.
- DEBEN estar registrados en [Errores Conocidos](./known-errors.md).
- Los nuevos grupos de `reason` DEBEN estar justificados por nuevos contextos de negocio.

### Consideraciones de Seguridad

- Los errores de autenticación NUNCA DEBEN indicar si un usuario existe.
- Ningún mensaje DEBE contener stack traces o identificadores internos sensibles.

### Monitoreo

- TODOS los errores DEBEN ser registrados para auditoría.
- Los errores `4xx` y `5xx` DEBEN ser monitoreados continuamente.
- Los errores `5xx` DEBEN activar alertas.

## Cuándo Usar

Esta especificación DEBE aplicarse en:

- APIs REST públicas e internas
- Comunicación entre microservicios
- Integraciones con socios y sistemas externos
- Interfaces de usuario que consumen APIs de la plataforma

## Notas Adicionales

- La documentación de APIs DEBE listar los posibles valores de `code` y `reason` por operación.



