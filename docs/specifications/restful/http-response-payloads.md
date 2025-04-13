---
sidebar_position: 3
---

# Payload de Resposta

A estrutura de resposta deve ser a seguinte:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `data` | object \| array | Dados retornados pela operação, quando a requisição é bem sucedida. |
| `errors` | array | Lista de erros, quando a requisição não é bem sucedida. |
| `pagination` | object | Informações de paginação, quando aplicável. |
| `debug` | object | Informações para debug, quando solicitado o header `X-Grg-Debug`. |

## Em caso de Sucesso

O `data` deve ser retornado quando a requisição é bem sucedida, e deve conter os dados relativos a entidade manipulada, incluindo o `entity_id`, o `external_entity_id` e o `entity_type`, conforme a especificação de [Entidades](../entities.md).

### Payload com os dados

```json
{
  "data": {
    "entity_id": "string",
    "external_entity_id": "string",
    "entity_type": "string",
    //...
  }
}
```

### Payload com os dados e paginação.

```json
{
  "data": [
    {
      "entity_id": "uint64",
      "external_entity_id": "string",
      //...
    }
  ],
  "pagination": {
    "page_size": "uint32",
    "next_page_token": "string",
    "previous_page_token": "string",
    "first_page_token": "string",
    "last_page_token": "string",
    "total_count": "uint32",
    "has_next_page": "boolean",
    "has_previous_page": "boolean"
  }
}
```

## Em caso de Erro

O payload de erro deve ser retornado quando ocorrer um erro na requisição, seja por parte do cliente `4xx` ou do servidor `5xx`.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `code` | string | Código do erro, conforme definido em [Manipulação de Erros](../errors-handling.md). |
| `reason` | string | Motivo do erro, conforme definido em [Manipulação de Erros](../errors-handling.md). |
| `message` | string | Mensagem informativa do erro, para o desenvolvedor compreender como lidar com o erro. |

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string" // a mensagem default em inglês
    }
  ]
}
```

> **IMPORTANTE:**
> O campo `message` tem caráter informativo para o desenvolvedor compreender como lidar com o erro e NÃO DEVE ser utilizado para mensagens de erro ao cliente final.

## Em caso de Debug

O payload de debug deve ser retornado quando o header `X-Grg-Debug` estiver presente e com o valor `true`.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `trace_id` | string | ID de rastreio da requisição. Também retornado no header `X-Grd-Trace-Id`. |
| `correlation_id` | string | Id de correlação da requisição. Também retornado no header `X-Grg-Correlation-Id`. |
| `instance` | string | Identificador único da instância. |
| `timestamp` | string | Timestamp da requisição em UNIX Epoch. |
| `duration` | string | Tempo de resposta da requisição em milissegundos. |
| `memory` | string | Memória utilizada pela requisição em bytes. |
| `query` | string | Query da requisição, quando aplicável. |
| `params` | string | Parâmetros da requisição, quando aplicável. |
| `internal_ip` | string | IP interno do pod. |
| `external_ip` | string | IP externo do proxy ou gateway da requisição. |

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string" // a mensagem default em inglês
    }
  ],
  "debug": {
    "trace_id": "string",
    "correlation_id": "string",
    "instance": "string",
    "timestamp": "string",
    "duration": "string",
    "memory": "string",
    "query": "string",
    "params": "string",
    "internal_ip": "string",
    "external_ip": "string"
  }
}
```

Referências:
- [RFC 7807: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
