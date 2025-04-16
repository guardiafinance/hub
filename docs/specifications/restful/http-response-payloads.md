---
sidebar_position: 2
---

# Payload de Resposta

Esta especificação define os requisitos obrigatórios para a estrutura de resposta de requisições HTTP da plataforma Guardia com o objetivo de garantir a interoperabilidade entre sistemas e a facilidade de consumo das APIs.

Esta especificação DEVE ser aplicável a todas as requisições HTTP da plataforma Guardia. A estrutura de resposta DEVE ser a seguinte:

| Propriedade                     | Tipo            | Descrição                                                           |
|---------------------------------|-----------------|---------------------------------------------------------------------|
| [`data`](#data)                 | object \| array | Dados retornados pela operação, quando a requisição é bem sucedida. |
| [`pagination`](#pagination)     | object          | Informações de paginação, quando aplicável.                         |
| [`errors`](#errors)             | array           | Lista de erros, quando a requisição não é bem sucedida.             |
| [`debug`](#debug)               | object          | Informações para debug, quando solicitado o header `X-Grd-Debug`.   |

### Estrutura Padrão

As respostas das APIs DEVEM seguir uma estrutura unificada, que permita manuseio consistente tanto para cenários de sucesso quanto de erro ou depuração.

#### `data`
- DEVE ser um objeto quando a resposta corresponder a uma entidade única.
- DEVE ser um array quando a resposta corresponder a uma lista de entidades.
- DEVE estar presente QUANDO a requisição for processada com sucesso (`2xx`).
- NÃO DEVE ser incluído quando a resposta corresponder a um erro (`4xx` ou `5xx`).
- O conteúdo DEVE refletir a semântica da operação (ex: entidade única, lista, resultado agregado).

#### `pagination`
- DEVE ser incluído SOMENTE quando a resposta corresponder a um recurso paginado.
- NÃO DEVE ser incluído quando a resposta corresponder a uma entidade única.
- DEVE estar presente QUANDO a requisição for processada com sucesso (`2xx`).
- NÃO DEVE ser incluído quando a resposta corresponder a um erro (`4xx` ou `5xx`).
- DEVE seguir a estrutura definida na seção [Paginação](./http-pagination.md#resposta).
- QUANDO ausente, o cliente DEVE assumir que a resposta não é paginada.

#### `errors`
- DEVE ser um array de objetos descrevendo falhas ocorridas na requisição.
- DEVE estar presente SOMENTE quando a resposta indicar erro (`4xx` ou `5xx`).
- NÃO DEVE ser incluído quando a resposta for processada com sucesso (`2xx`).
- CADA item DEVE conter pelo menos um `code`, um `reason` e uma `message` interpretável pelo cliente.

#### `debug`
- DEVE ser um objeto com informações adicionais sobre o processamento da requisição.
- SÓ DEVE ser incluído QUANDO o cabeçalho `X-Grd-Debug: true` for explicitamente fornecido na requisição.
- Os dados DEVEM conter identificadores de rastreamento (ex: request_id, tempo de execução, serviço de origem)
- NUNCA DEVEM expor dados sensíveis.

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
      "entity_type": "string",
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

| Propridade                      | Tipo   | Descrição                        |
|---------------------------------|--------|----------------------------------|
| [`code`](#code)                 | string | Código padronizado para o erro.  |
| [`reason`](#reason)             | string | Motivo do erro.                  |
| [`message`](#message)           | string | Mensagem informativa do erro.    |

### Estrutura da lista `errors`

Quando a requisição falhar (`4xx` ou `5xx`), a resposta DEVE conter a lista `errors` com uma lista de objetos descrevendo os erros ocorridos. Cada item da lista DEVE seguir a estrutura abaixo.

#### `code`
- DEVE ser uma string contendo o código de erro padronizado.
- O valor DEVE estar conforme definido na especificação de [Manipulação de Erros](../error-handling/index.md).
- DEVE ser utilizado para tratamento programático da falha.

#### `reason`
- DEVE ser uma string descrevendo de forma concisa o motivo do erro.
- DEVE corresponder a uma das razões pré-definidas na [Manipulação de Erros](../error-handling/index.md).
- Utilizado para categorização e análise semântica da falha.

#### `message`
- DEVE ser uma string com uma mensagem informativa voltada ao desenvolvedor.
- DEVE auxiliar no diagnóstico da falha e no entendimento de como resolvê-la.
- PODE conter informações adicionais sobre parâmetros inválidos, formatos incorretos ou requisitos não atendidos.

### Payload de erro

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string"
    }
  ]
}
```

> **IMPORTANTE:**
> A propriedade `message` tem caráter informativo para o desenvolvedor compreender como lidar com o erro e NÃO DEVE ser utilizada para mensagens de erro ao cliente final.

## Em caso de Debug

O payload de debug DEVE ser retornado quando o header `X-Grd-Debug` estiver presente e com o valor `true`.

| Propridade                          | Tipo   | Descrição                                          |
|-------------------------------------|--------|----------------------------------------------------|
| [`trace_id`](#trace_id)             | string | ID de rastreio da requisição.                      |
| [`correlation_id`](#correlation_id) | string | Id de correlação da requisição.                    |
| [`instance`](#instance)             | string | Identificador único da instância.                  |
| [`timestamp`](#timestamp)           | string | Timestamp da requisição em UNIX Epoch.             |
| [`duration`](#duration)             | string | Tempo de resposta da requisição em milissegundos.  |
| [`memory`](#memory)                 | string | Memória utilizada pela requisição em bytes.        |
| [`query`](#query)                   | string | Query da requisição, quando aplicável.             |
| [`params`](#params)                 | string | Parâmetros da requisição, quando aplicável.        |
| [`internal_ip`](#internal_ip)       | string | IP interno do pod.                                 |
| [`external_ip`](#external_ip)       | string | IP externo do proxy ou gateway da requisição.      |

### Estrutura do objeto `debug`

Quando presente, o objeto `debug` DEVE conter um objeto com metainformações úteis para rastreabilidade e depuração de requisições. Ele SÓ DEVE ser retornado se a requisição incluir o cabeçalho `X-Grd-Debug: true`.

#### `trace_id`
- DEVE ser uma string única representando o identificador global de rastreamento da requisição.
- TAMBÉM DEVE ser retornado no header `X-Grd-Trace-Id`.

#### `correlation_id`
- DEVE ser uma string representando o identificador de correlação da requisição.
- TAMBÉM DEVE ser retornado no header `X-Grd-Correlation-Id`.

#### `instance`
- DEVE ser uma string identificando unicamente a instância (pod ou processo) que processou a requisição.

#### `timestamp`
- DEVE ser um timestamp no formato UNIX Epoch (em segundos ou milissegundos).
- Representa o momento em que a requisição foi recebida.

#### `duration`
- DEVE ser uma string contendo o tempo total de processamento da requisição, em milissegundos.

#### `memory`
- DEVE ser uma string com a quantidade de memória consumida pela requisição, em bytes.

#### `query`
- PODE ser uma string com a query string da requisição, quando aplicável.
- DEVE ser omitida quando inexistente.

#### `params`
- PODE ser uma string contendo os parâmetros utilizados na rota (path parameters), quando aplicável.

#### `internal_ip`
- DEVE ser uma string com o endereço IP interno do pod ou nó de execução.

#### `external_ip`
- DEVE ser uma string com o endereço IP externo (proxy ou gateway) de origem da requisição.

---

### Payload de erro com debug

```json
{
  "errors": [
    {
      "code": "string",
      "reason": "string",
      "message": "string"
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
