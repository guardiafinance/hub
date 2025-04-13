---
sidebar_position: 4
---

# Pagination

This specification defines a unified **pagination** standard for all Guardia RESTful API endpoints that return resource lists. The goal is to ensure consistency between interfaces, predictability in data consumption, and interoperability between internal and external systems.

Standardizing pagination **prevents systemic overloads**, improves response time, and reduces computational resource usage. It aligns with **Compliance by Design** principles, such as:

  - *Efficiency*: through efficient pagination mechanisms, with data minimization, avoiding excessive returns.
  - *Transparency and auditability*: providing structured and traceable responses.
  - *Predictability*: allowing consumers to predict the behavior and outcome of pagination operations.

It supports **efficient integrations** with external tools and promotes internal component reuse.

## Request

Guardia systems MUST offer the following pagination mechanisms:

| Parameter     | Type    | Default | Maximum | Description                                    |
|--------------|---------|---------|---------|----------------------------------------------|
| `page_size`   | uint32  | 20     | 100    | Number of items per page. If not provided, the default value is assumed. |
| `page_token` | string  | -      | -      | Opaque token representing the current page.    |
| `order_by`   | string  | created_at  | -      | Base field for ordering. By default, it MUST be `created_at`. The options `updated_at` or `reference_date` MUST be explicitly informed. |
| `sort`       | string  | asc         | -      | Defines whether the ordering is ascending `asc` or descending `desc`. |

<br />

## Response

The response MUST contain the following fields:

| Field | Type | Description |
|-------|------|-----------|
| `data` | array | List of returned items |
| `pagination` | object | Object containing pagination information |
| `pagination.page_size` | uint32 | Number of items per page |
| `pagination.next_page_token` | string | Token for the next page of results |
| `pagination.previous_page_token` | string | Token for the previous page of results |
| `pagination.first_page_token` | string | Token for the first page (optional client usage) |
| `pagination.last_page_token` | string | Token for the last page (optional client usage) |
| `pagination.total_count` | uint32 | Total number of available records |

### Response Payload

#### JSON Example
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

For more details about general response conventions, see the [Response Payloads specification](./response-payloads.md).

### Response Headers

| Header         | Type | Description                                     |
|----------------|---------|------------------------------------------------|
| `Cache-Control`  | string | Indicates that the response can be temporarily stored on the client side, according to the [Cache-Control](./headers.md#cache-control) header specification. The cache expiration time must be compatible with the `page_token` lifetime. |
| `Link` | string | Contains links for the next and previous pages of results. |


Example:

```http
link:
</api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
</api/v1/ledgers?page_token={next_page_token}>; rel="next",
</api/v1/ledgers?page_token={last_page_token}>; rel="last",
</api/v1/ledgers?page_token={first_page_token}>; rel="first"
```

Learn more about the HTTP headers that Guardia uses [here](./http-headers.md).

## Expected Behaviors

### Pagination
- Filters and pagination MUST be combinable.
- If `page_token` is not provided, the API MUST return the first page of results, respecting the default ordering and `page_size = 20`.
- Endpoints that return with pagination MUST ensure support for reverse pagination, with `previous_page_token` and `first_page_token`.
- Item ordering MUST be stable and deterministic.

### Page Tokens
- `page_token` MUST expire securely or be validated by usage time.
- The page_token lifetime must be compatible with the response's `Cache-Control` header cache time.
- The fields `first_page_token` and `last_page_token` MUST be returned whenever technically possible, but MAY be omitted for payload or performance optimization.
- Fields such as `previous_page_token`, `next_page_token`, `first_page_token`, and `last_page_token` are EXCLUSIVE to the response and MUST NOT be used as input.


### Response
- If there are no results, the API MUST return `200 OK` with an empty list and `pagination.total_count = 0`.
- If there are invalid pagination parameters, the API MUST result in `400 Bad Request` with the reason `INVALID_ARGUMENT` and the respective error code.
- The response MUST contain a body according to the [Guardia response payloads specification](../response-payloads) for both success and error.
- Structural or parameter errors MUST follow the [Guardia error codes specification](../error_codes).

## Security, Expiration, and Compliance
- All `*_page_token` fields MUST be opaque tokens (encrypted or signed), without containing any readable or decodable structure by the client.
- Pagination tokens MUST expire within a reasonable time (e.g., 10 minutes) to prevent misuse.
- Every request MUST be logged with `X-Grd-Trace-Id`.
- Implementation MUST respect client authorization scopes.

## Known Errors

| Scenario | HTTP Code | Code | Reason |
|--------|---------------------|--------|------|
| `page_token` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_TOKEN_INVALID` |
| `page_token` expirado | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_TOKEN_EXPIRED` |
| `page_size` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_SIZE_INVALID` |
| `page_size` acima do limite | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_SIZE_TOO_LARGE` |
| `order_by` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `ORDER_BY_INVALID` |
| `sort` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `SORT_INVALID` |


#### JSON Example
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

## When to Use
- This specification MUST be applied to any REST API that returns resource lists.
- Even when the API returns a resource list with only one item, the specification MUST be applied.
- Existing APIs and contracts MUST be adapted progressively according to version evolution or migration.

## References
- [GitHub - REST API Pagination](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
- [HATEOAS](https://restfulapi.net/hateoas)