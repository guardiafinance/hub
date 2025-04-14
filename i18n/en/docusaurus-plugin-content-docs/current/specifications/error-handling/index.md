---
sidebar_position: 5
---

# Error Handling

This specification defines the standard for error representation, categorization, and handling in the Guardia platform. The goal is to ensure consistency, clarity, and traceability in error communication between services, API consumers, and user interfaces.

## Error Payload Structure

All errors MUST be encapsulated in the `errors` field, which MUST be an array of objects, even when there is only one error.

Each error object MUST contain the following properties:

| Property   | Type   | Description                                                               |
| ---------- | ------ | ----------------------------------------------------------------------- |
| [`code`](#error-codes-code)     | string | Semantic and descriptive code, in UPPER_SNAKE_CASE, unique in the domain. |
| [`reason`](#error-reason-reason)   | string | Semantic error category, used for programmatic handling.                 |
| [`message`](#error-message-message)  | string | Developer-oriented description, without revealing sensitive details.     |

### Payload Example

```json
{
  "errors": [
    {
      "code": "ERR402_INSUFFICIENT_FUNDS",
      "reason": "PAYMENT_IS_REQUIRED",
      "message": "Payment regularization is required to continue with the operation."
    }
  ]
}
```

## General Rules

### Error Codes (`code`)

- MUST be unique, in UPPER_SNAKE_CASE.
- MUST be prefixed with ERR and the HTTP code (e.g., `ERR400_...`).
- MUST follow consistency with corresponding HTTP status codes.

### Error Reason (`reason`)

- MUST be a string in UPPER_SNAKE_CASE.
- MUST indicate the specific and direct cause of the error, aiming to facilitate technical diagnosis and programmatic handling.
- MUST complement the `code`, providing additional context about the problem's origin.
- MAY have multiple possible `reason` values for the same `code`, varying according to the situation.
- MUST be listed in [Known Errors](./known-errors.md).
- MUST NOT contain sensitive data or internal technical traces.

### Message (`message`)

- MUST be descriptive and developer-oriented.
- MUST NEVER expose sensitive information or internal technical details.
- MAY be internationalizable via the `Accept-Language` header.

## Request Retry

- Retry conditions MUST be documented in [Known Errors](./known-errors.md).
- When applicable, errors MUST indicate if they are eligible for retry and include the recommended time through the `Retry-After` header.
- Clients MUST apply exponential backoff with base 2 when the time is not explicitly stated, up to a maximum of 4 attempts.
- After the 4th attempt, clients MUST adopt the circuit breaker pattern to prevent service overload.
  - The half-open state of the circuit breaker MAY be tested every 60 seconds.
- The number of attempts and intervals MUST be configurable by the client, respecting limits defined by the platform.

## Creating New Errors

- MUST follow the standardized structure.
- MUST be registered in [Known Errors](./known-errors.md).
- New `reason` groups MUST be justified by new business contexts.

### Security Considerations

- Authentication errors MUST NEVER indicate if a user exists.
- No message MUST contain stack traces or sensitive internal identifiers.

### Monitoring

- ALL errors MUST be logged for audit purposes.
- `4xx` and `5xx` errors MUST be continuously monitored.
- `5xx` errors MUST trigger alerts.

## When to Use

This specification MUST be applied in:

- Public and internal REST APIs
- Microservices communication
- Partner and external system integrations
- User interfaces consuming platform APIs

## Additional Notes

- API documentation MUST list possible `code` and `reason` values per operation.



