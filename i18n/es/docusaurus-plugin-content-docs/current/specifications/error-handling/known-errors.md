---
sidebar_position: 0
---

# Errores Conocidos

Este documento lista los errores estandarizados utilizados en la plataforma Guardia. Cada error se describe por su código único y será detallado con su(s) motivo(s) y tratamiento esperado en el futuro.

> **Importante:** Todos los errores DEBEN seguir la estructura definida en [Manejo de Errores](./index.md).

## ERR400_MISSING_OR_MALFORMED_HEADER

### `IDEMPOTENCY_KEY_REQUIRED`
- **Mensaje**: El recurso solicitado requiere el envío de un `Idempotency-Key` válido.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que el encabezado `Idempotency-Key` sea enviado y formateado correctamente según la [especificación de idempotencia](../../specifications/restful/http-headers.md#idempotency-key).

---

### `MALFORMED_CORRELATION_ID`
- **Mensaje**: El encabezado `X-Grd-Correlation-Id` no está correctamente formateado.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que el encabezado `X-Grd-Correlation-Id` sea enviado y formateado correctamente según la [especificación de correlación](../../specifications/restful/http-headers.md#x-grd-correlation-id).

---

### `INVALID_DEBUG_HEADER_VALUE`
- **Mensaje**: El encabezado `X-Grd-Debug` NO DEBE tener un valor diferente de `true` o `false`.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que el encabezado `X-Grd-Debug` sea enviado y formateado correctamente según la [especificación de depuración](../../specifications/restful/http-headers.md#x-grd-debug).

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
- **Mensaje**: La solicitud no puede ser procesada porque la operación ya fue ejecutada anteriormente con un payload diferente.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que el encabezado `Idempotency-Key` sea enviado y formateado correctamente según la [especificación de idempotencia](../../specifications/restful/http-headers.md#idempotency-key).

## ERR422_BUSINESS_ERROR

## ERR429_RATE_LIMITED

## ERR500_INTERNAL_ERROR

## ERR501_FEATURE_NOT_IMPLEMENTED

## ERR503_SERVICE_UNAVAILABLE

## ERR504_GATEWAY_TIMEOUT

