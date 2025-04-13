---
sidebar_position: 4
---

# Paginação

Esta especificação define um padrão unificado de **paginação** para todos os endpoints de APIs RESTful da Guardia que retornam listas de recursos. O objetivo é garantir consistência entre interfaces, previsibilidade no consumo de dados e interoperabilidade entre sistemas internos e externos.

Padronizar a paginação **evita sobrecargas sistêmicas**, melhora o tempo de resposta e reduz o uso de recursos computacionais. Está alinhada aos princípios de **Compliance by Design**, como:

  - *Eficiência*: por meio de mecanismos de paginação eficientes, com minimização de dados, evitando retornos excessivos.
  - *Transparência e auditabilidade*: proporcionando respostas estruturadas e rastreáveis.
  - *Previsibilidade*: permitindo que os consumidores prevejam o comportamento e o resultado das operações de paginação.

Suporta **integrações eficientes** com ferramentas externas e promove reutilização de componentes internos.

## Requisição

Os sistemas da Guardia DEVEM oferecer os seguintes mecanismos de paginação:

| Parâmetro     | Tipo    | Padrão | Máximo | Descrição                                    |
|--------------|---------|--------|--------|----------------------------------------------|
| `page_size`   | uint32  | 20     | 100    | Número de itens por página. Se não informado, assume-se o valor padrão. |
| `page_token` | string  | -      | -      | Token opaco representando a página atual.    |
| `order_by`   | string  | created_at  | -      | Campo base da ordenação. Por padrão, DEVE ser `created_at`. As opções `updated_at` ou `reference_date` DEVEM ser explicitamente informadas. |
| `sort`       | string  | asc         | -      | Define se a ordenação é crescente `asc` ou decrescente `desc`. |

<br />

## Resposta

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

Para mais detalhes sobre convenções gerais de resposta, consulte a [especificação de Payloads de Resposta](./response-payloads.md).

### Headers de Resposta

| Header         | Tipo | Descrição                                     |
|----------------|---------|------------------------------------------------|
| `Cache-Control`  | string | Indica que a resposta pode ser armazenada temporariamente do lado do cliente, conforme a especificação do header [Cache-Control](./headers.md#cache-control). O tempo de expiração do cache deve ser compatível com o tempo de vida do `page_token`. |
| `Link` | string | Contém links para as próximas e anteriores páginas de resultados. |


Exemplo:
```
link:
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={next_page_token}>; rel="next",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={last_page_token}>; rel="last",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={first_page_token}>; rel="first"
```


Saiba mais sobre os headers HTTP que a Guardia utiliza [aqui](./http-headers.md).

## Comportamentos Esperados

### Paginação
- Filtros e paginação DEVEM ser combináveis.
- Se `page_token` não for informado, a API DEVE retornar a primeira página de resultados, respeitando a ordenação padrão e `page_size = 20`.
- Endpoints que retornam com paginação DEVEM garantir suporte a paginação reversa, com `previous_page_token` e `first_page_token`.
- A ordenação dos itens DEVE ser estável e determinística.

### Tokens de Página
- `page_token` DEVE expirar de forma segura ou ser validado por tempo de uso.
- O tempo de vida do page_token deve ser compatível com tempo de cache do header `Cache-Control` da resposta.
- Os campos `first_page_token` e `last_page_token` DEVEM ser retornados sempre que tecnicamente possível, mas PODEM ser omitidos para otimização de payload ou performance.
- Campos como `previous_page_token`, `next_page_token`, `first_page_token` e `last_page_token` SÃO EXCLUSIVOS de resposta e NÃO DEVEM ser utilizados como entrada.


### Resposta
- Se não houver resultados, a API DEVE retornar `200 OK` com lista vazia e `pagination.total_count = 0`.
- Se haver parâmetros de paginação inválidos, a API DEVE resultar em `400 Bad Request` com o reason `INVALID_ARGUMENT` e o respectivo codigo de erro.
- A resposta DEVE conter corpo conforme a [especificação de response payloads da Guardia](../response-payloads) tanto para sucesso quanto para erro.
- Erros estruturais ou de parâmetros DEVEM seguir a [especificação de error codes da Guardia](../error_codes).

## Segurança, Expiração e Conformidade
- Todos os campos `*_page_token` DEVEM ser tokens opacos (criptografados ou assinados), sem conter qualquer estrutura legível ou decodificável pelo cliente.
- Tokens de paginação DEVEM expirar em tempo razoável (ex: 10 minutos) para evitar uso indevido.
- Toda requisição DEVE ser registrada em log com `X-Grd-Trace-Id`.
- A implementação DEVE respeitar escopos de autorização do cliente.

## Erros Conhecidos

| Cenário | Código HTTP | Code | Reason |
|--------|---------------------|--------|------|
| `page_token` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_TOKEN_INVALID` |
| `page_token` expirado | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_TOKEN_EXPIRED` |
| `page_size` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_SIZE_INVALID` |
| `page_size` acima do limite | `400` | `ERR400_INVALID_ARGUMENT` | `PAGE_SIZE_TOO_LARGE` |
| `order_by` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `ORDER_BY_INVALID` |
| `sort` inválido | `400` | `ERR400_INVALID_ARGUMENT` | `SORT_INVALID` |


#### Exemplo de erro (JSON)
```json
{
  "errors": [
    {
      "code": "ERR400_INVALID_ARGUMENT",
      "reason": "PAGE_TOKEN_INVALID",
      "message": "The page token provided has an incorrect format. Please check the token before trying again."
    }
  ]
}
```

## Quando usar
- Esta especificação DEVE ser aplicada a qualquer API REST que retorne listas de recursos.
- Mesmo quando a API retorna uma lista de recursos com apenas um item, a especificação DEVE ser aplicada.
- APIs e contratos existentes DEVEM ser adaptados de forma progressiva conforme evolução de versão ou migração.

## Referências
- [GitHub - Paginação REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
- [HATEOAS](https://restfulapi.net/hateoas)

