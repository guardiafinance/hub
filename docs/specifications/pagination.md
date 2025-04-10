---
sidebar_position: 2
---

# Paginação

Esta especificação define um padrão unificado de **paginação** para todos os endpoints da Guardia que retornam listas de recursos, incluindo APIs RESTful (HTTP) e serviços gRPC. O objetivo é garantir consistência entre interfaces, previsibilidade no consumo de dados e interoperabilidade entre sistemas internos e externos.

Padronizar a paginação **evita sobrecargas sistêmicas**, melhora o tempo de resposta e reduz o uso de recursos computacionais. Está alinhada aos princípios de **Compliance by Design**, como:
  - *Minimização de dados* (evita retornos excessivos)
  - *Transparência e auditabilidade* (respostas estruturadas e rastreáveis)
  - *Governança contínua* (facilidade de revisão e documentação padronizada)

Suporta **integrações eficientes** com ferramentas externas e promove reutilização de componentes internos.

## Requisição (HTTP e gRPC)

Os sistemas da Guardia DEVEM oferecer os seguintes mecanismos de paginação:

| Parâmetro     | Tipo    | Padrão | Máximo | Descrição                                    |
|--------------|---------|--------|--------|----------------------------------------------|
| `page_size`   | uint32  | 20     | 100    | Número de itens por página. Se não informado, assume-se o valor padrão. |
| `page_token` | string  | -      | -      | Token opaco representando a página atual.    |
| `order_by`   | string  | created_at  | -      | Campo base da ordenação. Por padrão, DEVE ser `created_at`. As opções `updated_at` ou `reference_date` DEVEM ser explicitamente informadas. |
| `sort`       | string  | asc         | -      | Define se a ordenação é crescente `asc` ou decrescente `desc`. |


### Headers de Requisição (HTTP)

| Header         | Tipo | Padrão | Descrição                                     |
|----------------|---------|--------|------------------------------------------------|
| `X-Grd-External-Trace-Id` | string | - | Identificador único para rastreamento de requisições. Este header DEVE estar presente no request e na resposta. |
| `X-Grd-Debug` | boolean | false | Indica que a resposta DEVE conter informações de debug. |

<br />

- Todos os campos `*_page_token` DEVEM ser tokens opacos (criptografados ou assinados), sem conter qualquer estrutura legível ou decodificável pelo cliente.
- Parâmetros inválidos DEVEM resultar em `400 Bad Request` para API REST e `INVALID_ARGUMENT` para serviços gRPC.
- Campos como `first_page_token` e `last_page_token` SÃO EXCLUSIVOS de resposta e NÃO DEVEM ser utilizados como entrada.

## Resposta (HTTP e gRPC)

A resposta DEVE conter os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `data` | array | Lista de itens retornados |
| `pagination` | object | Objeto contendo informações de paginação |
| `pagination.page_size` | uint32 | Número de itens por página |
| `pagination.next_page_token` | string | Token para a próxima página de resultados |
| `pagination.previous_page_token` | string | Token para a página anterior de resultados |
| `pagination.first_page_token` | string | Token da primeira página (uso opcional no cliente) |
| `pagination.last_page_token` | string | Token da última página (uso opcional no cliente) |
| `pagination.total_count` | uint32 | Número total de registros disponíveis |

### Payload de Resposta

#### Exemplo em JSON
```json
{
  "data": [
    { "id": "abc", "name": "Item A" },
    { "id": "def", "name": "Item B" }
  ],
  "pagination": {
    "page_size": 20,
    "first_page_token": "eyJhbGciOi...",
    "next_page_token": "eyJhbGciOi...",
    "previous_page_token": "eyJhbGciOi...",
    "last_page_token": "eyJhbGciOi...",
    "total_count": 200
  }
}
```

#### Exemplo em Protobuf
```proto
message Item {
  string id = 1;
  string name = 2;
}

message Pagination {
  uint32 page_size = 1;
  string first_page_token = 2;
  string next_page_token = 3;
  string previous_page_token = 4;
  string last_page_token = 5;
  uint32 total_count = 6;
}

message ListResponse {
  repeated Item data = 1;
  Pagination pagination = 2;
}
```

Para mais detalhes sobre convenções gerais de resposta, consulte a [especificação de Payloads de Resposta](./response-payloads.md).

### Headers de Resposta (HTTP)

| Header         | Tipo | Descrição                                     |
|----------------|---------|------------------------------------------------|
| `Cache-Control`  | string | Indica que a resposta pode ser armazenada temporariamente do lado do cliente, conforme a especificação do header [Cache-Control](./headers.md#cache-control). O tempo de expiração do cache deve ser compatível com o tempo de vida do `page_token`. |
| `X-Grd-Trace-Id` | string | Identificador único para rastreamento de requisições. Este header DEVE estar presente no request e na resposta. |
| `X-Grd-Debug` | boolean | Indica que a resposta contem informações de debug. |

## Comportamentos Esperados

### Paginação
- Filtros e paginação DEVEM ser combináveis.
- Se `page_token` não for informado, a API DEVE retornar a primeira página de resultados, respeitando a ordenação padrão e `page_size = 20`.
- A ordenação dos itens DEVE ser estável e determinística.

### Tokens de Página
- `page_token` DEVE expirar de forma segura ou ser validado por tempo de uso.
- O tempo de vida do page_token deve ser compatível com tempo de cache do header `Cache-Control` da resposta.
- Os campos `first_page_token` e `last_page_token` DEVEM ser retornados sempre que tecnicamente possível, mas PODEM ser omitidos para otimização de payload ou performance.
- Sistemas que retornam `previous_page_token` e `first_page_token` DEVEM garantir suporte a paginação reversa.

### Resposta
- Se não houver resultados, a API DEVE retornar `200 OK` com lista vazia e `pagination.total_count = 0`.
- A resposta DEVE conter corpo conforme a [especificação de response payloads da Guardia](../response-payloads) tanto para sucesso quanto para erro.
- Erros estruturais ou de parâmetros DEVEM seguir a [especificação de error codes da Guardia](../error_codes).

## Segurança, Expiração e Conformidade
- Tokens de paginação DEVEM expirar em tempo razoável (ex: 10 minutos) para evitar uso indevido.
- Toda requisição DEVE ser registrada em log com `X-Grd-Trace-Id`.
- A implementação DEVE respeitar escopos de autorização do cliente.

## Erros Conhecidos

| Cenário | Código HTTP / gRPC | Reason | Code |
|--------|---------------------|--------|------|
| `page_token` inválido | 400 / INVALID_ARGUMENT | INVALID_ARGUMENT | ERR400_INVALID_PAGE_TOKEN |
| `page_token` expirado | 400 / INVALID_ARGUMENT | INVALID_ARGUMENT | ERR400_EXPIRED_PAGE_TOKEN |
| `page_size` inválido | 400 / INVALID_ARGUMENT | INVALID_ARGUMENT | ERR400_INVALID_PAGE_SIZE |
| `page_size` acima do limite | 400 / INVALID_ARGUMENT | INVALID_ARGUMENT | ERR400_PAGE_SIZE_TOO_LARGE |
| `order_by` inválido | 400 / INVALID_ARGUMENT | INVALID_ARGUMENT | ERR400_INVALID_ORDER_BY |
| `sort` inválido | 400 / INVALID_ARGUMENT | INVALID_ARGUMENT | ERR400_INVALID_SORT |


#### Exemplo de erro (JSON)
```json
{
  "errors": [
    {
      "code": "ERR400_INVALID_PAGE_TOKEN",
      "reason": "INVALID_ARGUMENT",
      "message": "The page token provided has an incorrect format"
    }
  ]
}
```

## Quando aplicar
- Esta especificação DEVE ser aplicada a qualquer serviço (REST ou gRPC) que retorne listas de recursos.
- APIs e contratos existentes DEVEM ser adaptados de forma progressiva conforme evolução de versão ou migração.

## Referências
- [gRPC Pagination Docs](https://google.aip.dev/158)
- [GitHub - Paginação REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)

