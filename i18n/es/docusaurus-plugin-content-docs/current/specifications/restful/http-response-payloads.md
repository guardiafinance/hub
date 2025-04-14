---
sidebar_position: 2
---

# Payload de Respuesta

Esta especificación define los requisitos obligatorios para la estructura de respuesta de solicitudes HTTP de la plataforma Guardia con el objetivo de garantizar la interoperabilidad entre sistemas y la facilidad de consumo de las APIs.

Esta especificación DEBE ser aplicable a todas las solicitudes HTTP de la plataforma Guardia. La estructura de respuesta DEBE ser la siguiente:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `data` | object \| array | Datos devueltos por la operación cuando la solicitud es exitosa. |
| `errors` | array | Lista de errores cuando la solicitud no es exitosa. |
| `pagination` | object | Información de paginación cuando es aplicable. |
| `debug` | object | Información para depuración cuando se solicita el header `X-Grd-Debug`. |

## En caso de Éxito

El campo `data` DEBE ser devuelto cuando la solicitud es exitosa, y DEBE contener los datos relacionados con la entidad manipulada, incluyendo `entity_id`, `external_entity_id` y `entity_type`, según la especificación de [Entidades](../entities.md).

### Payload con datos

```json
{
  "data": {
    "entity_id": "string",
    "external_entity_id": "string",
    "entity_type": "string",
    //...
  }
}
```

### Payload con datos e paginación

```json
{
  "data": [
    {
      "entity_id": "uint64",
      "external_entity_id": "string",
      //...
    }
  ],
  "pagination": {
    "page_size": "uint32",
    "next_page_token": "string",
    "previous_page_token": "string",
    "first_page_token": "string",
    "last_page_token": "string",
    "total_count": "uint32",
    "has_next_page": "boolean",
    "has_previous_page": "boolean"
  }
}
```

## En caso de Error

El payload de error DEBE ser devuelto cuando ocurre un error en la solicitud, ya sea del lado del cliente `4xx` o del servidor `5xx`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `code` | string | Código de error, según se define en [Manejo de Errores](../errors-handling.md). |
| `reason` | string | Razón del error, según se define en [Manejo de Errores](../errors-handling.md). |
| `message` | string | Mensaje informativo del error para que el desarrollador entienda cómo manejar el error. |

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string" // mensaje predeterminado en inglés
    }
  ]
}
```

> **IMPORTANTE:**
> El campo `message` es informativo para que el desarrollador entienda cómo manejar el error y NO DEBE utilizarse para mensajes de error al usuario final.

## En caso de Depuración

El payload de depuración DEBE ser devuelto cuando el header `X-Grd-Debug` está presente y establecido en `true`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `trace_id` | string | ID de seguimiento de la solicitud. También devuelto en el header `X-Grd-Trace-Id`. |
| `correlation_id` | string | ID de correlación de la solicitud. También devuelto en el header `X-Grd-Correlation-Id`. |
| `instance` | string | Identificador único de la instancia. |
| `timestamp` | string | Marca de tiempo de la solicitud en UNIX Epoch. |
| `duration` | string | Tiempo de respuesta de la solicitud en milisegundos. |
| `memory` | string | Memoria utilizada por la solicitud en bytes. |
| `query` | string | Consulta de la solicitud cuando es aplicable. |
| `params` | string | Parámetros de la solicitud cuando es aplicable. |
| `internal_ip` | string | IP interna del pod. |
| `external_ip` | string | IP externa del proxy o gateway de la solicitud. |

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string" // mensaje predeterminado en inglés
    }
  ],
  "debug": {
    "trace_id": "string",
    "correlation_id": "string",
    "instance": "string",
    "timestamp": "string",
    "duration": "string",
    "memory": "string",
    "query": "string",
    "params": "string",
    "internal_ip": "string",
    "external_ip": "string"
  }
}
```

## Notas adicionales

- Los payloads utilizados en cada endpoint DEBEN ser documentados en el contrato OAS de la API.
- Los payloads aquí descritos son considerados el **estándar mínimo** para cualquier API RESTful de Guardia.

Referencias:
- [RFC 7807: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
