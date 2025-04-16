---
sidebar_position: 2
---

# Payload de Respuesta

Esta especificación define los requisitos obligatorios para la estructura de respuesta de solicitudes HTTP de la plataforma Guardia con el objetivo de garantizar la interoperabilidad entre sistemas y la facilidad de consumo de las APIs.

Esta especificación DEBE ser aplicable a todas las solicitudes HTTP de la plataforma Guardia. La estructura de respuesta DEBE ser la siguiente:

| Propiedad                     | Tipo            | Descripción                                                           |
|-----------------------------|-----------------|---------------------------------------------------------------------|
| [`data`](#data)             | object \| array | Datos devueltos por la operación cuando la solicitud es exitosa.     |
| [`pagination`](#pagination) | object          | Información de paginación cuando es aplicable.                       |
| [`errors`](#errors)         | array           | Lista de errores cuando la solicitud no es exitosa.                  |
| [`debug`](#debug)           | object          | Información para depuración cuando se solicita el header `X-Grd-Debug`.|

### Estructura Estándar

Las respuestas de las APIs DEBEN seguir una estructura unificada que permita un manejo consistente tanto para escenarios de éxito como de error o depuración.

#### `data`
- DEBE ser un objeto cuando la respuesta corresponde a una entidad única.
- DEBE ser un array cuando la respuesta corresponde a una lista de entidades.
- DEBE estar presente CUANDO la solicitud se procesa con éxito (`2xx`).
- NO DEBE incluirse cuando la respuesta corresponde a un error (`4xx` o `5xx`).
- El contenido DEBE reflejar la semántica de la operación (ej: entidad única, lista, resultado agregado).

#### `pagination`
- DEBE incluirse SOLAMENTE cuando la respuesta corresponde a un recurso paginado.
- NO DEBE incluirse cuando la respuesta corresponde a una entidad única.
- DEBE estar presente CUANDO la solicitud se procesa con éxito (`2xx`).
- NO DEBE incluirse cuando la respuesta corresponde a un error (`4xx` o `5xx`).
- DEBE seguir la estructura definida en la sección [Paginación](./http-pagination.md#respuesta).
- CUANDO esté ausente, el cliente DEBE asumir que la respuesta no está paginada.

#### `errors`
- DEBE ser un array de objetos que describen las fallas ocurridas en la solicitud.
- DEBE estar presente SOLAMENTE cuando la respuesta indica un error (`4xx` o `5xx`).
- NO DEBE incluirse cuando la respuesta se procesa con éxito (`2xx`).
- CADA elemento DEBE contener al menos un `code`, un `reason` y un `message` interpretable por el cliente.

#### `debug`
- DEBE ser un objeto con información adicional sobre el procesamiento de la solicitud.
- SOLO DEBE incluirse CUANDO el encabezado `X-Grd-Debug: true` se proporcione explícitamente en la solicitud.
- Los datos DEBEN contener identificadores de seguimiento (ej: request_id, tiempo de ejecución, servicio de origen)
- NUNCA DEBEN exponer datos sensibles.

## En caso de Éxito

El `data` DEBE ser devuelto cuando la solicitud es exitosa, y DEBE contener los datos relacionados con la entidad manipulada, incluyendo `entity_id`, `external_entity_id` y `entity_type`, según la especificación de [Entidades](../entities.md).

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

### Payload con datos y paginación

```json
{
  "data": [
    {
      "entity_id": "uint64",
      "external_entity_id": "string",
      "entity_type": "string",
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

| Propiedad                     | Tipo   | Descripción                      |
|------------------------------ |--------|----------------------------------|
| [`code`](#code)               | string | Código de error estandarizado.   |
| [`reason`](#reason)           | string | Razón del error.                 |
| [`message`](#message)         | string | Mensaje informativo del error.   |

### Estructura de la lista `errors`

Cuando la solicitud falla (`4xx` o `5xx`), la respuesta DEBE contener la lista `errors` con una lista de objetos que describen los errores ocurridos. Cada elemento de la lista DEBE seguir la estructura a continuación.

#### `code`
- DEBE ser una cadena que contenga el código de error estandarizado.
- El valor DEBE estar conforme a lo definido en la especificación de [Manejo de Errores](../error-handling/index.md).
- DEBE ser utilizado para el manejo programático del error.

#### `reason`
- DEBE ser una cadena que describa de forma concisa la razón del error.
- DEBE corresponder a una de las razones predefinidas en [Manejo de Errores](../error-handling/index.md).
- Utilizado para categorización y análisis semántico de la falla.

#### `message`
- DEBE ser una cadena con un mensaje informativo dirigido al desarrollador.
- DEBE ayudar en el diagnóstico de la falla y en la comprensión de cómo resolverla.
- PUEDE contener información adicional sobre parámetros inválidos, formatos incorrectos o requisitos no cumplidos.

### Payload de error

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string"
    }
  ]
}
```

> **IMPORTANTE:**
> La propiedad `message` es informativa para que el desarrollador entienda cómo manejar el error y NO DEBE utilizarse para mensajes de error al usuario final.

## En caso de Depuración

El payload de depuración DEBE ser devuelto cuando el header `X-Grd-Debug` está presente y establecido en `true`.

| Propiedad                          | Tipo   | Descripción                                          |
|----------------------------------|--------|----------------------------------------------------|
| [`trace_id`](#trace_id)          | string | ID de seguimiento de la solicitud.                  |
| [`correlation_id`](#correlation_id)| string | ID de correlación de la solicitud.                 |
| [`instance`](#instance)          | string | Identificador único de la instancia.                |
| [`timestamp`](#timestamp)        | string | Marca de tiempo de la solicitud en UNIX Epoch.      |
| [`duration`](#duration)          | string | Tiempo de respuesta de la solicitud en milisegundos.|
| [`memory`](#memory)              | string | Memoria utilizada por la solicitud en bytes.        |
| [`query`](#query)                | string | Consulta de la solicitud cuando es aplicable.       |
| [`params`](#params)              | string | Parámetros de la solicitud cuando es aplicable.     |
| [`internal_ip`](#internal_ip)    | string | IP interna del pod.                                 |
| [`external_ip`](#external_ip)    | string | IP externa del proxy o gateway de la solicitud.     |

### Estructura del objeto `debug`

Cuando está presente, el objeto `debug` DEBE contener un objeto con metainformación útil para la trazabilidad y depuración de solicitudes. SOLO DEBE ser devuelto si la solicitud incluye el encabezado `X-Grd-Debug: true`.

#### `trace_id`
- DEBE ser una cadena única que represente el identificador global de seguimiento de la solicitud.
- TAMBIÉN DEBE ser devuelto en el encabezado `X-Grd-Trace-Id`.

#### `correlation_id`
- DEBE ser una cadena que represente el identificador de correlación de la solicitud.
- TAMBIÉN DEBE ser devuelto en el encabezado `X-Grd-Correlation-Id`.

#### `instance`
- DEBE ser una cadena que identifique de forma única la instancia (pod o proceso) que procesó la solicitud.

#### `timestamp`
- DEBE ser una marca de tiempo en formato UNIX Epoch (en segundos o milisegundos).
- Representa el momento en que se recibió la solicitud.

#### `duration`
- DEBE ser una cadena que contenga el tiempo total de procesamiento de la solicitud, en milisegundos.

#### `memory`
- DEBE ser una cadena con la cantidad de memoria consumida por la solicitud, en bytes.

#### `query`
- PUEDE ser una cadena con la cadena de consulta de la solicitud, cuando es aplicable.
- DEBE omitirse cuando no existe.

#### `params`
- PUEDE ser una cadena que contenga los parámetros utilizados en la ruta (parámetros de ruta), cuando es aplicable.

#### `internal_ip`
- DEBE ser una cadena con la dirección IP interna del pod o nodo de ejecución.

#### `external_ip`
- DEBE ser una cadena con la dirección IP externa (proxy o gateway) de origen de la solicitud.

### Payload de error con depuración

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string"
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
