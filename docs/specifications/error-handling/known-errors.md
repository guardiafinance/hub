---
sidebar_position: 0
---

# Erros Conhecidos

Este documento lista os erros padronizados utilizados na plataforma Guardia. Cada erro é descrito por seu código único e será detalhado com seu(s) motivo(s) e tratamento esperado futuramente.

> **Importante:** Todos os erros DEVEM seguir a estrutura definida em [Tratamento de Erros](./index.md).

## ERR400_MISSING_OR_MALFORMED_HEADER

### `IDEMPOTENCY_KEY_REQUIRED`
- **Mensagem**: O recurso solicitado exige o envio de um `Idempotency-Key` válido.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que o header `Idempotency-Key` seja enviado e corretamente formatado conforme a [especificação de idempotência](../../specifications/restful/http-headers.md#idempotency-key).

---

### `MALFORMED_CORRELATION_ID`
- **Mensagem**: O header `X-Grd-Correlation-Id` não está corretamente formatado.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que o header `X-Grd-Correlation-Id` seja enviado e corretamente formatado conforme a [especificação de correlação](../../specifications/restful/http-headers.md#x-grd-correlation-id).

---

### `INVALID_DEBUG_HEADER_VALUE`
- **Mensagem**: O header `X-Grd-Debug` não DEVE ter um valor diferente de `true` ou `false`.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que o header `X-Grd-Debug` seja enviado e corretamente formatado conforme a [especificação de debug](../../specifications/restful/http-headers.md#x-grd-debug).


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
- **Mensagem**: A requisição não pode ser processada porque a operação já foi executada anteriormente com um payload diferente.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que o header `Idempotency-Key` seja enviado e corretamente formatado conforme a [especificação de idempotência](../../specifications/restful/http-headers.md#idempotency-key).

## ERR422_BUSINESS_ERROR

## ERR429_RATE_LIMITED

## ERR500_INTERNAL_ERROR

## ERR501_FEATURE_NOT_IMPLEMENTED

## ERR503_SERVICE_UNAVAILABLE

## ERR504_GATEWAY_TIMEOUT

