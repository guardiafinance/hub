---
sidebar_position: 1
---

# Status Codes

This document defines usage guidelines for the main HTTP status codes in the context of Guardia's RESTful APIs. The goal is to promote consistency between teams and avoid ambiguities in integrations, ensuring a predictable experience for internal and external consumers.

These guidelines MUST be applied to all Guardia modules and services, whether in the public API layer or internal integrations. Consistency in status codes improves traceability, reduces consumption errors, and facilitates diagnostics.

## 2xx - Success Responses

| Code                       | Status                    | Methods                        | Notes                                           |
|------------------------------|---------------------------|--------------------------------|-------------------------------------------------------|
| [200](#200-ok)               | OK                        | `GET`, `POST`, `PUT`, `PATCH`  | Successful operations that return data.           |
| [201](#201-created)          | Created                   | `POST`, `PUT`                  | When a new resource is created.                      |
| [202](#202-accepted)         | Accepted                  | `POST`, `PUT`, `PATCH`         | Asynchronous processing.                             |
| [204](#204-no-content)       | No Content                | `DELETE`, `PUT`, `PATCH`       | Success without response content.                     |

### 200 OK

**When to use:**
- Request processed successfully.
- Response includes data or operation confirmation.
- Listings that return no results (e.g., empty array) but were processed successfully.

**When not to use:**
- When a new entity was created (use `201`).
- When processing is still pending (use `202`).
- When there is no relevant content to return (use `204`).

### 201 Created

**When to use:**
- A new entity was successfully created.
- `POST` or `PUT` request resulted in resource creation.

**When not to use:**
- When the resource already existed and was only updated.
- When the creation process has not yet finished (use `202`).

### 202 Accepted

**When to use:**
- The request was accepted, but processing will occur asynchronously.
- The final result will be notified later or will be available at another endpoint.

**When not to use:**
- When the operation result is already available.
- When there is no intention to process the request.

### 204 No Content

**When to use:**
- Operation was completed successfully, but there is no content to return.
- Cases such as deletion, update confirmation, or empty query response.

**When not to use:**
- When content return is expected.
- When the absence of content indicates an error.
- In situations where the response will be used for cache validation, as `204` does not carry cache control headers applicable to the body.

## 3xx - Redirections

| Code                       | Status                    | Methods                        | Notes                                           |
|------------------------------|---------------------------|--------------------------------|-------------------------------------------------------|
| [301](#301-moved-permanently) | Moved Permanently        | `GET`, `HEAD`                  | Permanent route redirection.                 |
| [304](#304-not-modified)     | Not Modified              | `GET`, `HEAD`                  | Cache response when no changes occurred.         |
| [307](#307-temporary-redirect) | Temporary Redirect      | All                          | Redirects maintaining the original method and body.       |

### 301 Moved Permanently

**When to use:**
- When an endpoint or resource has been permanently moved to a new URL.
- MUST be used in APIs that are in the process of discontinuing old routes.

**When not to use:**
- When the route change is temporary (use 307).
- When the client MUST still use the current URL.

### 304 Not Modified

**When to use:**
- When the requested resource has not changed since the last cached request (using If-Modified-Since or ETag).
- Useful for optimizing network consumption in APIs with strong caching.

**When not to use:**
- When the response does not use caching mechanisms or version control.
- When the resource content has changed and needs to be returned (use 200).

### 307 Temporary Redirect

**When to use:**
- When a resource is temporarily accessible at another URL.
- The HTTP method and request body MUST be preserved.
- Cases of temporary redirection after authentication or delegation.

**When not to use:**
- When the change is permanent (use 301).
- When the intention is to force the client to change the URL definitively.
- When the method MUST be converted to GET (never use 307 in this case).

## 4xx - Client Errors

| Code                       | Status                    | Methods                        | Notes                                           |
|------------------------------|---------------------------|--------------------------------|-------------------------------------------------------|
| [400](#400-bad-request)      | Bad Request               | All                          | Malformed or invalid request.                    |
| [401](#401-unauthorized)     | Unauthorized              | All                          | Missing or invalid authentication.                     |
| [402](#402-payment-required) | Payment Required         | All                          | Payment required for access.                      |
| [403](#403-forbidden)        | Forbidden                 | All                          | Access denied even with authentication.                 |
| [404](#404-not-found)        | Not Found                 | All                          | Non-existent resource.                                  |
| [408](#408-request-timeout)  | Request Timeout           | All                          | Client took too long to complete the request.          |
| [409](#409-conflict)         | Conflict                  | `PUT`, `PATCH`, `POST`         | Conflict with current resource state.               |
| [422](#422-unprocessable-entity)  | Unprocessable Entity | `POST`, `PUT`, `PATCH`         | Valid data, but with semantic error.                |
| [429](#429-too-many-requests)   | Too Many Requests      | All                          | Request limit exceeded.                       |

### 400 Bad Request

**When to use:**
- Malformed request or invalid data.
- Simple syntactic or semantic validation failure.

**When not to use:**
- When the data is correct but doesn't make sense in the context (use `422`).

### 401 Unauthorized

**When to use:**
- Required authentication not provided or invalid token.

**When not to use:**
- When the client is authenticated but lacks permission (use `403`).

### 402 Payment Required

**When to use:**
- Resource access conditioned on payment or active subscription.

**When not to use:**
- When the issue is related to permissions (use `403`).
- When there is no relation to billing or plans.

### 403 Forbidden

**When to use:**
- Client is authenticated but not authorized for the resource.

**When not to use:**
- When the user is not authenticated (use `401`).

### 404 Not Found

**When to use:**
- The requested resource was not found.
- The provided ID does not correspond to any known item.

**When not to use:**
- When the resource exists but access is restricted (use `403`).

### 408 Request Timeout

**When to use:**
- Client took too long to send the complete request.

**When not to use:**
- When the timeout occurred between servers (use `504`).

### 409 Conflict

**When to use:**
- Conflict with current resource state (e.g., duplication, outdated version).

**When not to use:**
- When the error is validation-related (use `400` or `422`).

### 422 Unprocessable Entity

**When to use:**
- Syntactically correct data but semantically invalid (e.g., invalid CPF, insufficient balance).

**When not to use:**
- When the problem is formatting or missing properties (use `400`).

### 429 Too Many Requests

**When to use:**
- Client exceeded request limits per time period (rate limit).

**When not to use:**
- When the error is not related to volume or usage limit.

## 5xx - Server Errors

| Code                       | Status                    | Methods                        | Notes                                           |
|------------------------------|---------------------------|--------------------------------|-------------------------------------------------------|
| [500](#500-internal-server-error)   | Internal Server Error     | All                   | Unexpected internal error.                              |
| [501](#501-not-implemented)  | Not Implemented           | Any unsupported         | Valid method but not implemented on server.      |
| [502](#502-bad-gateway)      | Bad Gateway               | All                          | Error receiving response from another server.           |
| [503](#503-service-unavailable)   | Service Unavailable  | All                          | Service temporarily down.                   |
| [504](#504-gateway-timeout)  | Gateway Timeout           | All                          | No response in time from another server.               |

### 500 Internal Server Error

**When to use:**
- Unexpected failures or unhandled exceptions.
- Internal system problems.

**When not to use:**
- When the error is predictable or treatable by the client.

### 501 Not Implemented

**When to use:**
- Valid HTTP method but not supported.
- Functionality not yet implemented.

**When not to use:**
- When the resource exists but there is an internal failure in processing (use `500`).

### 502 Bad Gateway

**When to use:**
- Gateway received invalid response from another server.

**When not to use:**
- When the error is in the service itself and not in the intermediary (use `500`).

### 503 Service Unavailable

**When to use:**
- Service temporarily unavailable due to maintenance or overload.

**When not to use:**
- When the service is active but failed internally (use `500`).

### 504 Gateway Timeout

**When to use:**
- Gateway or proxy did not receive response in time from another server.

**When not to use:**
- When the timeout occurred from client to server (use `408`).

## Additional notes

- The status codes used in each endpoint MUST be documented in the API's OAS contract.
- The status codes described here are considered the **minimum standard** for any Guardia RESTful API.

## References

- [RFC 9110 – HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110#name-status-codes)
- [HTTP response status codes - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
