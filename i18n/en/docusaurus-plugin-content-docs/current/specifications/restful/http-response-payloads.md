---
sidebar_position: 3
---

# Response Payload

The response structure should be as follows:

| Field | Type | Description |
|-------|------|-------------|
| `data` | object \| array | Data returned by the operation when the request is successful. |
| `errors` | array | List of errors when the request is not successful. |
| `pagination` | object | Pagination information when applicable. |
| `debug` | object | Debug information when the `X-Grd-Debug` header is requested. |

## In case of Success

The `data` field should be returned when the request is successful, and should contain the data related to the manipulated entity, including `entity_id`, `external_entity_id` and `entity_type`, according to the [Entities](../entities.md) specification.

### Payload with data

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

### Payload with data and pagination

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

## In case of Error

The error payload should be returned when an error occurs in the request, whether from the client side `4xx` or server side `5xx`.

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Error code, as defined in [Error Handling](../errors-handling.md). |
| `reason` | string | Error reason, as defined in [Error Handling](../errors-handling.md). |
| `message` | string | Informative error message for the developer to understand how to handle the error. |

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string" // default message in English
    }
  ]
}
```

> **IMPORTANT:**
> The `message` field is informative for the developer to understand how to handle the error and SHOULD NOT be used for end-user error messages.

## In case of Debug

The debug payload should be returned when the `X-Grd-Debug` header is present and set to `true`.

| Field | Type | Description |
|-------|------|-------------|
| `trace_id` | string | Request trace ID. Also returned in the `X-Grd-Trace-Id` header. |
| `correlation_id` | string | Request correlation ID. Also returned in the `X-Grd-Correlation-Id` header. |
| `instance` | string | Unique instance identifier. |
| `timestamp` | string | Request timestamp in UNIX Epoch. |
| `duration` | string | Request response time in milliseconds. |
| `memory` | string | Memory used by the request in bytes. |
| `query` | string | Request query when applicable. |
| `params` | string | Request parameters when applicable. |
| `internal_ip` | string | Internal pod IP. |
| `external_ip` | string | External proxy or gateway IP of the request. |

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string" // default message in English
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

References:
- [RFC 7807: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
