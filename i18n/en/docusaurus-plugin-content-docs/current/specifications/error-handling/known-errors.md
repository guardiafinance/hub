---
sidebar_position: 0
---

# Known Errors

This document lists the standardized errors used in the Guardia platform. Each error is described by its unique code and will be detailed with its reason(s) and expected treatment in the future.

> **Important:** All errors MUST follow the structure defined in [Error Handling](./index.md).

## ERR400_MISSING_OR_MALFORMED_HEADER

### `IDEMPOTENCY_KEY_REQUIRED`
- **Message**: The requested resource requires a valid `Idempotency-Key` to be sent.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the `Idempotency-Key` header is sent and correctly formatted according to the [idempotency specification](../../specifications/restful/http-headers.md#idempotency-key).

---

### `MALFORMED_CORRELATION_ID`
- **Message**: The `X-Grd-Correlation-Id` header is not correctly formatted.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the `X-Grd-Correlation-Id` header is sent and correctly formatted according to the [correlation specification](../../specifications/restful/http-headers.md#x-grd-correlation-id).

---

### `INVALID_DEBUG_HEADER_VALUE`
- **Message**: The `X-Grd-Debug` header MUST NOT have a value other than `true` or `false`.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the `X-Grd-Debug` header is sent and correctly formatted according to the [debug specification](../../specifications/restful/http-headers.md#x-grd-debug).

## ERR400_INVALID_PAYLOAD

## ERR400_INVALID_PARAMETER

## ERR401_UNAUTHORIZED

## ERR402_INSUFFICIENT_FUNDS

## ERR403_FORBIDDEN

## ERR404_NOT_FOUND

## ERR405_INVALID_OPERATION

## ERR408_REQUEST_TIMEOUT

## ERR409_SERVER_STATE_CONFLICT

### `CONFLICTING_IDEMPOTENT_REQUEST`
- **Message**: The request cannot be processed because the operation has already been executed previously with a different payload.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the `Idempotency-Key` header is sent and correctly formatted according to the [idempotency specification](../../specifications/restful/http-headers.md#idempotency-key).

## ERR422_BUSINESS_ERROR

## ERR429_RATE_LIMITED

## ERR500_INTERNAL_ERROR

## ERR501_FEATURE_NOT_IMPLEMENTED

## ERR503_SERVICE_UNAVAILABLE

## ERR504_GATEWAY_TIMEOUT

