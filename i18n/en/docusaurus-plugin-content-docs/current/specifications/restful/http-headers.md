---
sidebar_position: 3
---

# Headers

This specification describes the standard and custom headers adopted by Guardia in its RESTful APIs.

Its goal is to promote consistency between interfaces, ensure predictability in data consumption, and facilitate interoperability between internal modules, external services, and partner integrations.

Header standardization contributes to:
- Efficient request traceability
- Secure debugging in controlled environments
- Integration scalability
- Compliance with security standards
- Better development experience

All headers MUST follow the naming pattern defined in this specification.

## Standard Headers

| Header                                              | Type     | Category | Direction | Required    | Description                         |
|-----------------------------------------------------|----------|-----------|-----------|--------------|-------------------------------------|
| [Accept](#accept)                                     | string   | standard  | Request   | Optional     | Accepted response format.           |
| [Accept-Language](#accept-language)                   | string   | standard  | Request   | Optional     | Preferred language.                 |
| [Content-Type](#content-type)                         | string   | standard  | Both      | Optional     | Content format.                     |
| [Content-Language](#content-language)                 | string   | standard  | Response  | Optional     | Response language.                  |
| [Cache-Control](#cache-control)                       | string   | standard  | Response  | Optional     | Cache control directives.           |
| [Link](#link)                                         | string   | standard  | Response  | Optional     | Navigation links.                   |
| [Idempotency-Key](#idempotency-key)                  | string   | standard  | Both      | Optional     | Idempotency key.                    |
| [Content-Digest](#content-digest)                     | string   | standard  | Response  | Optional     | Payload hash.                       |
| [Last-Modified](#last-modified)                       | timestamp| standard  | Response  | Optional     | Last modification date.             |
| [Retry-After](#retry-after)                          | integer  | standard  | Response  | Optional     | Time in seconds to wait before retrying the request. |

---

### Accept

The `Accept` header MUST be used to specify the response format accepted by the client.

#### Usage Examples

```http
Accept: application/vnd.guardia.v1+json
```

---

### Accept-Language

The `Accept-Language` header MUST be used to specify the client's preferred language.

#### Usage Examples

```http
Accept-Language: en
```

---

### Content-Type

The `Content-Type` header MUST be used to specify the content format of the request and response.

#### Usage Examples

```http
Content-Type: application/vnd.guardia.v1+json
```

---

### Content-Language

The `Content-Language` header MUST be used to specify the response language. MUST return the value requested through the `Accept-Language` header of the request.

#### Usage Examples

```http
Content-Language: en
```

---

### Cache-Control

The `Cache-Control` header MUST be used to guide caching mechanisms in both requests and responses.

#### Response

The cache MUST be configured with the `max-age=<seconds>` directive, preceded by:

- `public`, when the cache can be shared among multiple users:

```http
Cache-Control: public, max-age=<seconds>
```

- `private`, when the cache is exclusive to the end user:

```http
Cache-Control: private, max-age=<seconds>
```

For responses that MUST NOT be cached:

```http
Cache-Control: no-store
```

Other directives MAY be added as needed, following [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111#section-5.2).

---

### Link

The `Link` header MAY be used to provide links for pagination or entity state, following the [HATEOAS](https://restfulapi.net/hateoas) directives.

#### Pagination

```http
link:
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={next_page_token}>; rel="next",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={last_page_token}>; rel="last",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={first_page_token}>; rel="first"
```

#### Entity State

```http
Link: <https://{tenant_id}.guardia.finance/api/v1/ledgers/{entity_id}>; rel="ledger"
```

---

### Idempotency-Key

The `Idempotency-Key` header MUST be used to identify an idempotent request.

```http
Idempotency-Key: <uuid>
```

#### Validation

- MUST be used according to the [idempotency specification](../idempotency.md#implementation-in-apis).

---

### Content-Digest

The `Content-Digest` header MUST be used to provide the hash of the request payload in an idempotent request.

```http
Content-Digest: sha-256=<hash>
```

#### Validation

- MUST be used according to the [idempotency specification](../idempotency.md#implementation-in-apis).
- The algorithm MUST be `sha-256`.
- The hash MUST be calculated over the request payload JSON, after serialization and before any compression.
- The hash MUST be represented in hexadecimal, in lowercase, without prefix (ex: `0x`).
- The hash MUST have exactly 64 characters.
- The hash MUST be calculated after normalizing the JSON (removing whitespace, sorting properties).
- The hash MUST be recalculated and validated in each idempotent request.

#### Exemplos

```http
Content-Digest: sha-256=2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

---

### Last-Modified

The `Last-Modified` header MUST be used to provide the last modification date of the entity.

```http
Last-Modified: <http-date>
```

#### Validation

- MUST be a valid date and time value according to [RFC 7232](https://datatracker.ietf.org/doc/html/rfc7232#autoid-6).
- MUST be used according to the [idempotency specification](../idempotency.md#implementation-in-apis).

---

### Retry-After

The `Retry-After` header MUST be returned in case of error 429 (Too Many Requests) to indicate the time in seconds to wait before retrying the request.

```http
Retry-After: <seconds>
```

#### Validation

- MUST be a positive integer value.

## Custom Headers

Custom headers used by Guardia follow the `X-Grd-*` prefix convention. They address specific needs for traceability and correlation between systems.

| Header                                              | Type     | Category | Direction | Required    | Description                                             |
|-----------------------------------------------------|----------|-----------|-----------|-------------|---------------------------------------------------------|
| [X-Grd-Debug](#x-grd-debug)                         | boolean  | custom    | Request   | Optional    | Flag to enable debug mode.                              |
| [X-Grd-Trace-Id](#x-grd-trace-id)                   | uuid     | custom    | Response  | Required    | Unique request ID for traceability.                     |
| [X-Grd-Correlation-Id](#x-grd-correlation-id)       | uuid     | custom    | Both      | Optional    | Correlation ID for distributed calls.                   |

### X-Grd-Debug

Optional boolean header. When present with value `true`, the response MUST include the `debug` object in the payload, containing additional information according to [response payload specification](./http-response-payloads.md#in-case-of-debug).

```http
X-Grd-Debug: true
```

#### Validation
- MUST accept only `true` or `false` values (case insensitive)
- Any other value MUST result in `400 Bad Request` with code `ERR400_MISSING_OR_MALFORMED_HEADER` and reason `INVALID_DEBUG_HEADER_VALUE`
- Use in production environments MUST be controlled by:
  - Specific permission scope
  - Maximum usage time restricted to 10 minutes per client
  - Limit of 10 requests per minute
  - Usage interval restricted to at least 1 minute between requests
  - Usage audit logging

### X-Grd-Trace-Id

Required header returned in **all responses** from Guardia APIs. Represents the unique request identifier.

- MUST be generated by Guardia infrastructure
- MUST track the request and response throughout all system layers, including domain events and webhook notifications
- The value MUST follow the UUIDv7 standard, with timestamp marking as specified in [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7)

```http
X-Grd-Trace-Id: <uuid>
```

#### Validation
- MUST be a valid UUIDv7
- MUST be included in all responses, including errors

### X-Grd-Correlation-Id

Optional header sent by external systems. Used to propagate tracking context throughout distributed calls.

- If present in the request, MUST be included in the response
- If present in the request, MUST be propagated through all system layers, including domain events and webhook notifications
- The value MUST follow the UUID standard proposed by [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562)

```http
X-Grd-Correlation-Id: <uuid>
```

#### Validation
- If present, MUST be a valid UUID
- If invalid, MUST be ignored and a new value MUST be generated

## Security Considerations

- Tracking headers MUST NOT contain:
  - Sensitive data
  - PII (Personally Identifiable Information)
  - Secrets or credentials
  - Confidential business information
- Requests MUST be validated:
  - Regardless of authentication status
  - Considering the tenant's security context
  - Respecting configured rate limits
- Custom headers MUST:
  - Be validated for maximum size
  - Be sanitized to prevent code injection
  - Be limited in quantity per request

## Additional Notes

- Headers used in each endpoint MUST be documented in the API's OAS contract
- The headers described here are considered the **minimum standard** for any Guardia RESTful API

## References

- [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
- [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111)
- [RFC 7232: Conditional Requests](https://datatracker.ietf.org/doc/html/rfc7232)
- [HTTP Headers - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [HATEOAS](https://restfulapi.net/hateoas)
