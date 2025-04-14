---
sidebar_position: 2
---

# Payload de Resposta

Esta especificação define os requisitos obrigatórios para a estrutura de resposta de requisições HTTP da plataforma Guardia com o objetivo de garantir a interoperabilidade entre sistemas e a facilidade de consumo das APIs.

Esta especificação DEVE ser aplicável a todas as requisições HTTP da plataforma Guardia. A estrutura de resposta DEVE ser a seguinte:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| [`data`](#payload-com-os-dados) | object \| array | Dados retornados pela operação, quando a requisição é bem sucedida. |
| [`pagination`](#payload-com-os-dados-e-paginação) | object | Informações de paginação, quando aplicável. |
| [`errors`](#em-caso-de-erro) | array | Lista de erros, quando a requisição não é bem sucedida. |
| [`debug`](#em-caso-de-debug) | object | Informações para debug, quando solicitado o header `X-Grd-Debug`. |

## Em caso de Sucesso

O `data` DEVE ser retornado quando a requisição é bem sucedida, e DEVE conter os dados relativos a entidade manipulada, incluindo o `entity_id`, o `external_entity_id` e o `entity_type`, conforme a especificação de [Entidades](../entities.md).

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

O payload de erro DEVE ser retornado quando ocorrer um erro na requisição, seja por parte do cliente `4xx` ou do servidor `5xx`.

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

O payload de debug DEVE ser retornado quando o header `X-Grd-Debug` estiver presente e com o valor `true`.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `trace_id` | string | ID de rastreio da requisição. Também retornado no header `X-Grd-Trace-Id`. |
| `correlation_id` | string | Id de correlação da requisição. Também retornado no header `X-Grd-Correlation-Id`. |
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

## Notas adicionais

- Os payloads utilizados em cada endpoint DEVE ser documentado no contrato OAS da API.
- Os payloads aqui descritos são considerados **padrão mínimo** para qualquer API RESTful da Guardia.

Referências:
- [RFC 7807: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
