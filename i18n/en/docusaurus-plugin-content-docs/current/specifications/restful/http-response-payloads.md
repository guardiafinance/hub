---
sidebar_position: 2
---

# Response Payload

This specification defines the mandatory requirements for the HTTP response structure of the Guardia platform with the goal of ensuring interoperability between systems and ease of API consumption.

This specification MUST be applicable to all HTTP requests of the Guardia platform. The response structure MUST be as follows:

| Property                     | Type            | Description                                                           |
|-----------------------------|-----------------|---------------------------------------------------------------------|
| [`data`](#data)             | object \| array | Data returned by the operation when the request is successful.       |
| [`pagination`](#pagination) | object          | Pagination information when applicable.                              |
| [`errors`](#errors)         | array           | List of errors when the request is not successful.                   |
| [`debug`](#debug)           | object          | Debug information when the `X-Grd-Debug` header is requested.        |

### Standard Structure

API responses MUST follow a unified structure that allows consistent handling for both success and error or debugging scenarios.

#### `data`
- MUST be an object when the response corresponds to a single entity.
- MUST be an array when the response corresponds to a list of entities.
- MUST be present WHEN the request is processed successfully (`2xx`).
- MUST NOT be included when the response corresponds to an error (`4xx` or `5xx`).
- The content MUST reflect the operation semantics (e.g., single entity, list, aggregated result).

#### `pagination`
- MUST be included ONLY when the response corresponds to a paginated resource.
- MUST NOT be included when the response corresponds to a single entity.
- MUST be present WHEN the request is processed successfully (`2xx`).
- MUST NOT be included when the response corresponds to an error (`4xx` or `5xx`).
- MUST follow the structure defined in the [Pagination](./http-pagination.md#response) section.
- WHEN absent, the client MUST assume the response is not paginated.

#### `errors`
- MUST be an array of objects describing failures that occurred in the request.
- MUST be present ONLY when the response indicates an error (`4xx` or `5xx`).
- MUST NOT be included when the response is processed successfully (`2xx`).
- EACH item MUST contain at least a `code`, a `reason`, and a `message` interpretable by the client.

#### `debug`
- MUST be an object with additional information about request processing.
- MUST ONLY be included WHEN the `X-Grd-Debug: true` header is explicitly provided in the request.
- The data MUST contain tracking identifiers (e.g., request_id, execution time, source service)
- MUST NEVER expose sensitive data.

## In case of Success

The `data` MUST be returned when the request is successful, and MUST contain the data related to the manipulated entity, including `entity_id`, `external_entity_id` and `entity_type`, according to the [Entities](../entities.md) specification.

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

## In case of Error

The error payload MUST be returned when an error occurs in the request, whether from the client side `4xx` or server side `5xx`.

| Property                      | Type   | Description                      |
|-------------------------------|--------|----------------------------------|
| [`code`](#code)               | string | Standardized error code.         |
| [`reason`](#reason)           | string | Error reason.                    |
| [`message`](#message)         | string | Informative error message.       |

### Structure of the `errors` list

When the request fails (`4xx` or `5xx`), the response MUST contain the `errors` list with a list of objects describing the errors that occurred. Each item in the list MUST follow the structure below.

#### `code`
- MUST be a string containing the standardized error code.
- The value MUST be as defined in the [Error Handling](../error-handling/index.md) specification.
- MUST be used for programmatic error handling.

#### `reason`
- MUST be a string concisely describing the reason for the error.
- MUST correspond to one of the predefined reasons in [Error Handling](../error-handling/index.md).
- Used for categorization and semantic analysis of the failure.

#### `message`
- MUST be a string with an informative message aimed at the developer.
- MUST help in diagnosing the failure and understanding how to resolve it.
- MAY contain additional information about invalid parameters, incorrect formats, or unmet requirements.

### Error payload

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

> **IMPORTANT:**
> The `message` property is informative for the developer to understand how to handle the error and MUST NOT be used for end-user error messages.

## In case of Debug

The debug payload MUST be returned when the `X-Grd-Debug` header is present and set to `true`.

| Property                          | Type   | Description                                          |
|----------------------------------|--------|----------------------------------------------------|
| [`trace_id`](#trace_id)          | string | Request trace ID.                                   |
| [`correlation_id`](#correlation_id)| string | Request correlation ID.                            |
| [`instance`](#instance)          | string | Unique instance identifier.                         |
| [`timestamp`](#timestamp)        | string | Request timestamp in UNIX Epoch.                    |
| [`duration`](#duration)          | string | Request response time in milliseconds.              |
| [`memory`](#memory)              | string | Memory used by the request in bytes.                |
| [`query`](#query)                | string | Request query when applicable.                      |
| [`params`](#params)              | string | Request parameters when applicable.                 |
| [`internal_ip`](#internal_ip)    | string | Internal pod IP.                                    |
| [`external_ip`](#external_ip)    | string | External proxy or gateway IP of the request.        |

### Structure of the `debug` object

When present, the `debug` object MUST contain an object with metadata useful for request traceability and debugging. It MUST ONLY be returned if the request includes the `X-Grd-Debug: true` header.

#### `trace_id`
- MUST be a unique string representing the global trace identifier of the request.
- MUST ALSO be returned in the `X-Grd-Trace-Id` header.

#### `correlation_id`
- MUST be a string representing the request correlation identifier.
- MUST ALSO be returned in the `X-Grd-Correlation-Id` header.

#### `instance`
- MUST be a string uniquely identifying the instance (pod or process) that processed the request.

#### `timestamp`
- MUST be a timestamp in UNIX Epoch format (in seconds or milliseconds).
- Represents the moment when the request was received.

#### `duration`
- MUST be a string containing the total request processing time, in milliseconds.

#### `memory`
- MUST be a string with the amount of memory consumed by the request, in bytes.

#### `query`
- MAY be a string with the request query string, when applicable.
- MUST be omitted when non-existent.

#### `params`
- MAY be a string containing the parameters used in the route (path parameters), when applicable.

#### `internal_ip`
- MUST be a string with the internal IP of the pod or execution node.

#### `external_ip`
- MUST be a string with the external IP (proxy or gateway) of the request origin.

### Error payload with debug

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

## Additional notes

- The payloads used in each endpoint MUST be documented in the API OAS contract.
- The payloads described here are considered the **minimum standard** for any Guardia RESTful API.

References:
- [RFC 7807: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
