---
sidebar_position: 3
---

# Idempotency

Idempotency is a fundamental property in distributed systems that ensures repeated operations with the same parameters always produce the same result and do not cause additional side effects.

In the context of Guardia, idempotency is essential to preserve data consistency and ensure the reliability of interactions in APIs and event processing — especially in environments subject to network failures, timeouts, or automatic retry policies. This practice mitigates risks such as transaction duplication, state inconsistencies, and unwanted side effects.

---

## General Rules

### Fundamental Principles

- Idempotent operations MUST produce the same result for multiple executions with the same parameters.
- Idempotency verification MUST NOT depend solely on the idempotency key.
- Control MUST consider the combination of the key and the hash of the request or event payload.
- The idempotency key:
  - MUST be provided by the client.
  - MUST be unique per operation and route scope.
  - MUST follow the UUID format, according to [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).
- The hash MUST be generated using the `SHA-256` algorithm.

### Storage and Validation

- The idempotency state MUST be stored in a distributed and resilient cache system.
- The retention time of the state MUST be at least 2 hours and at most 24 hours.
- The system MUST validate:
  - If the key has been used.
  - If the payload hash matches the previous execution.

### Security and Compliance

- The idempotency state MUST be stored securely, in compliance with data protection policies.
- Access to this data MUST be auditable.
- Malicious attempts to repeat with the same key MUST be monitored and mitigated.
- Logs of idempotent operations MUST contain traceable identifiers for later analysis.

### Technical Dependencies

- Distributed storage for temporary persistence of operation state.
- Resilient cache for fast responses and deduplication.
- Audit and continuous monitoring mechanisms.

---

## Implementation in APIs

- Endpoints that modify state (e.g., `POST`, `PUT`, `PATCH`) MUST be idempotent.
- The `Idempotency-Key` header MUST be mandatory in these endpoints.
- WHEN not provided, the system MUST return `400 BAD REQUEST`, with code `ERR400_INVALID_ARGUMENT` and reason `IDEMPOTENCY_KEY_REQUIRED`.
- The response MUST include the same `Idempotency-Key` header.
- The first execution MUST store:
  - The operation result.
  - The payload hash.
  - The idempotency key and timestamp.
- Subsequent requests with the same key and payload hash:
  - MUST return the original stored result.
  - MUST NOT execute the operation again.
  - MUST include the `Last-Modified` header with the original execution date.
- WHEN the key is already registered, BUT the payload hash is different:
  - The system MUST reject the request with error `409 CONFLICT`, code `ERR409_CONFLICT` and reason `CONFLICTING_IDEMPOTENT_REQUEST`.

---

## Implementation in Events

- All events published by the platform MUST be idempotent.
- The `idempotencykey` field MUST be present in the payload, according to [event spec](../specifications/cloud-events.md).
- The consumer MUST register the execution state based on the key and event hash.
- The event MUST be considered unique per `idempotencykey`.
- If an event has already been processed:
  - The system MUST ignore it and return ACK to the broker.
  - MUST NOT reexecute the associated logic.
  - The original execution MAY be logged for audit purposes.

## Expected Behaviors

### In APIs

#### First Request:
- Operation is processed.
- Result is persisted with the key and payload hash.
- Returns 200 with payload and `Idempotency-Key`.

#### Repeated Request with same key and payload hash:
- Previous result is returned.
- Operation is NOT reexecuted.
- Returns 200 and `Last-Modified` header.

#### Request with same key but different payload hash:
- System REJECTS with `409 CONFLICT` error.
- Must return clear message with code `ERR409_CONFLICT` and reason `CONFLICTING_IDEMPOTENT_REQUEST`.

### In Events

#### First Receipt:
- Event is processed normally.
- Result is persisted for future deduplication.
- System state is changed according to business rule.

#### Duplicate Event:
- Event is recognized as already processed.
- Operation is ignored.
- ACK is sent to the broker.
- Logs MAY indicate it was a repeated event.

## When to Use

Idempotency MUST be applied:

- In any operation that modifies system state (APIs and events).
- In critical business flows (e.g., transaction creation, users, contracts).
- In systems subject to network failures, replications, or timeouts.
- Whenever the client or consumer has an active retry policy.

## When Not to Use

Idempotency MUST NOT be applied:

- In purely read operations (e.g., `GET`, query events).
- In flows that do not generate side effects.
- In calls that, by definition, must always produce new results (e.g., random UUID generation, polling, etc.).

## References

- [Draft RFC The Idempotency-Key Header Field](https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-01.html)
- [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562)
