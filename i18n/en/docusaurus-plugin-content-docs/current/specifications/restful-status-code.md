---
sidebar_position: 1
---

# HTTP Status Code

This document defines usage guidelines for the main HTTP status codes in the context of Guardia's RESTful APIs. The goal is to promote consistency between teams and avoid ambiguities in integrations, ensuring a predictable experience for internal and external consumers.

Each code has two sections:
- **When to use**: appropriate cases to apply the code.
- **When not to use**: common pitfalls or situations where usage would be inappropriate.

## 2xx - Success Responses

### 200 OK

**When to use:**
- Request processed successfully.
- Response includes data or operation confirmation.

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
- When the creation process is not yet complete (use `202`).

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

## 3xx - Redirections

### 301 Moved Permanently

**When to use:**
- When an endpoint or resource has been permanently moved to a new URL.
- Should be used in APIs that are in the process of discontinuing old routes.

**When not to use:**
- When the route change is temporary (use 307).
- When the client should still use the current URL.

### 304 Not Modified

**When to use:**
- When the requested resource has not changed since the last cached request (using If-Modified-Since or ETag).
- Useful for optimizing network consumption in APIs with strong caching.

**When not to use:**
- When the response does not use caching or version control mechanisms.
- When the resource content has changed and needs to be returned (use 200).

### 307 Temporary Redirect

**When to use:**
- When a resource is temporarily accessible at another URL.
- The HTTP method and original request body must be preserved.
- Cases of temporary redirection after authentication or delegation.

**When not to use:**
- When the change is permanent (use 301).
- When the intention is to force the client to change the URL definitively.
- When the method should be converted to GET (never use 307 in this case).

## 4xx - Client Errors

### 400 Bad Request

**When to use:**
- Malformed request or invalid data.
- Simple syntactic or semantic validation failure.

**When not to use:**
- When the data is correct but doesn't make sense in context (use `422`).

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
- Conflict with the current state of the resource (e.g., duplication, outdated version).

**When not to use:**
- When the error is validation-related (use `400` or `422`).

### 422 Unprocessable Entity

**When to use:**
- Syntactically correct data but semantically invalid (e.g., invalid CPF, insufficient balance).

**When not to use:**
- When the problem is formatting or missing fields (use `400`).

### 429 Too Many Requests

**When to use:**
- Client exceeded request limits per time period (rate limit).

**When not to use:**
- When the error is not related to volume or usage limits.

## 5xx - Server Errors

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

## Final Considerations

These guidelines should be applied across all Guardia modules and services, whether in the public API layer or internal integrations. Consistency in status codes improves traceability, reduces consumption errors, and facilitates diagnostics.

## References

[HTTP response status codes - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)