---
sidebar_position: 4
---

# Paginación

Esta especificación define un estándar unificado de **paginación** para todos los endpoints de APIs RESTful de Guardia que devuelven listas de recursos. El objetivo es garantizar la consistencia entre interfaces, la previsibilidad en el consumo de datos y la interoperabilidad entre sistemas internos y externos.

La estandarización de la paginación **previene sobrecargas sistémicas**, mejora el tiempo de respuesta y reduce el uso de recursos computacionales. Está alineada con los principios de **Compliance by Design**, como:

  - *Eficiencia*: a través de mecanismos de paginación eficientes, con minimización de datos, evitando retornos excesivos.
  - *Transparencia y auditabilidad*: proporcionando respuestas estructuradas y rastreables.
  - *Previsibilidad*: permitiendo que los consumidores predigan el comportamiento y el resultado de las operaciones de paginación.

Apoya **integración eficiente** con herramientas externas y promueve la reutilización de componentes internos.

## Solicitud

Los sistemas de Guardia DEBEN ofrecer los siguientes mecanismos de paginación:

| Parámetro     | Tipo    | Predeterminado | Máximo | Descripción                                    |
|--------------|---------|----------------|--------|----------------------------------------------|
| `page_size`   | uint32  | 20     | 100    | Número de elementos por página. Si no se proporciona, se asume el valor predeterminado. |
| `page_token` | string  | -      | -      | Token opaco que representa la página actual.    |
| `order_by`   | string  | created_at  | -      | Campo base para la ordenación. Por defecto, DEBE ser `created_at`. Las opciones `updated_at` o `reference_date` DEBEN ser informadas explícitamente. |
| `sort`       | string  | asc         | -      | Define si la ordenación es ascendente `asc` o descendente `desc`. |

<br />

## Respuesta

La respuesta DEBE contener los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-----------|
| `data` | array | Lista de elementos devueltos |
| `pagination` | object | Objeto que contiene información de paginación |
| `pagination.page_size` | uint32 | Número de elementos por página |
| `pagination.next_page_token` | string | Token para la siguiente página de resultados |
| `pagination.previous_page_token` | string | Token para la página anterior de resultados |
| `pagination.first_page_token` | string | Token de la primera página (uso opcional en el cliente) |
| `pagination.last_page_token` | string | Token de la última página (uso opcional en el cliente) |
| `pagination.total_count` | uint32 | Número total de registros disponibles |

### Payload de Respuesta

#### Ejemplo en JSON
```json
{
  "data": [
    { "id": "abc", "name": "Item A" },
    { "id": "def", "name": "Item B" }
  ],
  "pagination": {
    "page_size": 20,
    "first_page_token": "eyJhbGciOi...",
    "next_page_token": "eyJhbGciOi...",
    "previous_page_token": "eyJhbGciOi...",
    "last_page_token": "eyJhbGciOi...",
    "total_count": 200
  }
}
```

Para más detalles sobre las convenciones generales de respuesta, consulte la [especificación de Payloads de Respuesta](./response-payloads.md).

### Headers de Respuesta

| Header         | Tipo | Descripción                                     |
|----------------|---------|------------------------------------------------|
| `Cache-Control`  | string | Indica que la respuesta puede ser almacenada temporalmente en el lado del cliente, según la especificación del header [Cache-Control](./headers.md#cache-control). El tiempo de expiración del caché DEBE ser compatible con el tiempo de vida del `page_token`. |
| `Link` | string | Contiene enlaces para las páginas siguientes y anteriores de resultados. |


Ejemplo:

```http
link:
</api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
</api/v1/ledgers?page_token={next_page_token}>; rel="next",
</api/v1/ledgers?page_token={last_page_token}>; rel="last",
</api/v1/ledgers?page_token={first_page_token}>; rel="first"
```


Conozca más sobre los headers HTTP que utiliza Guardia [aquí](./http-headers.md).

## Comportamientos Esperados

### Paginación
- Los filtros y la paginación DEBEN ser combinables.
- Si no se proporciona `page_token`, la API DEBE devolver la primera página de resultados, respetando el orden predeterminado y `page_size = 20`.
- Los endpoints que devuelven con paginación DEBEN garantizar soporte para paginación inversa, con `previous_page_token` y `first_page_token`.
- El orden de los elementos DEBE ser estable y determinista.

### Tokens de Página
- `page_token` DEBE expirar de forma segura o ser validado por tiempo de uso.
- El tiempo de vida del page_token DEBE ser compatible con el tiempo de caché del header `Cache-Control` de la respuesta.
- Los campos `first_page_token` y `last_page_token` DEBEN ser devueltos siempre que sea técnicamente posible, pero PUEDEN ser omitidos para optimización de payload o rendimiento.
- Campos como `previous_page_token`, `next_page_token`, `first_page_token` y `last_page_token` son EXCLUSIVOS de la respuesta y NO DEBEN ser utilizados como entrada.


### Respuesta
- Si no hay resultados, la API DEBE devolver `200 OK` con lista vacía y `pagination.total_count = 0`.
- Si hay parámetros de paginación inválidos, la API DEBE resultar en `400 Bad Request` con el motivo `INVALID_ARGUMENT` y el respectivo código de error.
- La respuesta DEBE contener un cuerpo según la [especificación de response payloads de Guardia](../response-payloads) tanto para éxito como para error.
- Los errores estructurales o de parámetros DEBEN seguir la [especificación de error codes de Guardia](../error_codes).

## Seguridad, Expiración y Cumplimiento
- Todos los campos `*_page_token` DEBEN ser tokens opacos (encriptados o firmados), sin contener ninguna estructura legible o decodificable por el cliente.
- Los tokens de paginación DEBEN expirar en un tiempo razonable (ej: 10 minutos) para evitar uso indebido.
- Toda solicitud DEBE ser registrada en log con `X-Grd-Trace-Id`.
- La implementación DEBE respetar los alcances de autorización del cliente.

## Errores Conocidos

| Escenario | Código HTTP | Código | Motivo |
|--------|---------------------|--------|------|
| `page_token` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_TOKEN_INVALID` |
| `page_token` expirado | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_TOKEN_EXPIRED` |
| `page_size` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_SIZE_INVALID` |
| `page_size` por encima del límite | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_SIZE_TOO_LARGE` |
| `order_by` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `ORDER_BY_INVALID` |
| `sort` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `SORT_INVALID` |


#### Ejemplo de error (JSON)
```json
{
  "errors": [
    {
      "code": "ERR400_INVALID_ARGUMENT",
      "reason": "PAGE_TOKEN_INVALID",
      "message": "The page token provided has an incorrect format. Please check the token before trying again."
    }
  ]
}
```

## Cuándo Usar
- Esta especificación DEBE ser aplicada a cualquier API REST que devuelva listas de recursos.
- Incluso cuando la API devuelve una lista de recursos con un solo elemento, la especificación DEBE ser aplicada.
- Las APIs y contratos existentes DEBEN ser adaptados progresivamente según la evolución de versión o migración.

### Notas adicionales

- La paginación DEBE ser documentada en el contrato OAS de la API.
- La paginación aquí descrita es considerada el estándar mínimo para cualquier API RESTful de Guardia.

## Referencias
- [GitHub - Paginación REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
- [HATEOAS](https://restfulapi.net/hateoas)
