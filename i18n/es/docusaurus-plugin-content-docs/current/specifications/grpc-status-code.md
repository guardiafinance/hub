---
sidebar_position: 2
---

# gRPC Status Code

This document defines usage guidelines for the main gRPC status codes in the context of Guardia. The goal is to ensure consistency and clarity between development teams and integration partners when dealing with failures and responses in RPC calls.

Each code is presented with:
- **When to use**: recommended situations to apply the status.
- **When not to use**: incorrect uses or ambiguities to avoid.

## Success (0)

### OK (0)

**When to use:**
- When the operation was completed successfully without failures or exceptions.

**When not to use:**
- When there is a logical or technical error, even if the operation was partially executed.

## Client Errors (1–11)

### CANCELLED (1)

**When to use:**
- When the client cancels the request before the operation is completed.

**When not to use:**
- When the cancellation is internal to the server (use `ABORTED`).

### INVALID_ARGUMENT (3)

**When to use:**
- Arguments provided by the client are invalid (e.g., empty required fields, incorrect formats).

**When not to use:**
- When the argument is valid but outside an allowed range (use `OUT_OF_RANGE`).

### DEADLINE_EXCEEDED (4)

**When to use:**
- When the execution time limit (deadline) of the call has been reached.

**When not to use:**
- When the failure occurred due to service unavailability (use `UNAVAILABLE`).

### NOT_FOUND (5)

**When to use:**
- When the requested resource does not exist or has been removed.

**When not to use:**
- When the resource exists but the client does not have access permission (use `PERMISSION_DENIED`).

### ALREADY_EXISTS (6)

**When to use:**
- When the client attempts to create a resource that already exists.

**When not to use:**
- When there is a state conflict (use `FAILED_PRECONDITION` or `ABORTED`).

### PERMISSION_DENIED (7)

**When to use:**
- Client is authenticated but lacks permission to execute the action.

**When not to use:**
- When the client is not authenticated (use `UNAUTHENTICATED`).

### RESOURCE_EXHAUSTED (8)

**When to use:**
- When there is resource usage limitation, such as request limits or quota reached.

**When not to use:**
- When the operation fails due to logical error (use `FAILED_PRECONDITION`).

### FAILED_PRECONDITION (9)

**When to use:**
- The system is in an invalid state to process the request (e.g., directory is not empty).

**When not to use:**
- When the failure is due to concurrency (use `ABORTED`).

### ABORTED (10)

**When to use:**
- Concurrent conflicts or transaction failures that require retry at a higher level.

**When not to use:**
- When the operation is cancelled directly by the client (use `CANCELLED`).

### OUT_OF_RANGE (11)

**When to use:**
- Valid input outside an allowed range (e.g., negative index).

**When not to use:**
- When the error is in the logical or structural validity of the argument (use `INVALID_ARGUMENT`).

## Server Errors (12–16)

### UNIMPLEMENTED (12)

**When to use:**
- Called method is not implemented on the server.

**When not to use:**
- When there is an internal failure while trying to execute a valid method (use `INTERNAL`).

### INTERNAL (13)

**When to use:**
- Unexpected errors in the backend, such as invariant failures or uncaught exceptions.

**When not to use:**
- When it's possible to represent the error with more specific codes.

### UNAVAILABLE (14)

**When to use:**
- When the service is temporarily unavailable or under maintenance.
- When the client can retry the request with backoff.

**When not to use:**
- When the error is permanent (use `INTERNAL`, `UNIMPLEMENTED` or another more appropriate code).

### DATA_LOSS (15)

**When to use:**
- When there is data corruption or unrecoverable information loss.

**When not to use:**
- For temporary read or write failures (use `UNAVAILABLE`).

### UNAUTHENTICATED (16)

**When to use:**
- When the request does not contain valid authentication or is not authenticated.

**When not to use:**
- When the identity is confirmed but not authorized (use `PERMISSION_DENIED`).

## Final Considerations

These guidelines should be applied to all Guardia gRPC services, especially in contexts that require traceability, resilience, and security in APIs and distributed systems.

## References

[GRPC - Status Codes](https://grpc.io/docs/guides/status-codes)