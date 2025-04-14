---
sidebar_position: 3
---

# Headers

Esta especificação descreve os headers padrão e customizados adotados pela Guardia em suas APIs RESTful.

Seu objetivo é promover consistência entre interfaces, garantir previsibilidade no consumo de dados e facilitar a interoperabilidade entre módulos internos, serviços externos e integrações de parceiros.

A padronização dos headers contribui para rastreabilidade eficiente, depuração segura e escalabilidade das integrações.

| Header                  | Tipo     | Categoria | Direção   | Obrigatoriedade | Finalidade                                 |
|-------------------------|----------|-----------|-----------|-----------------|--------------------------------------------|
| [Cache-Control](#cache-control)           | string   | padrão    | Response  | Opcional        | Diretivas de controle de cache.            |
| [Link](#link)             | string   | padrão    | Response  | Opcional        | Links referente a paginação de resultados ou estado de uma entidade. |
| [X-Grd-Debug](#x-grd-debug)             | booleano | custom    | Request   | Opcional        | Ativa retorno de informações de debug.     |
| [X-Grd-Trace-Id](#x-grd-trace-id)          | uuid     | custom    | Response  | Obrigatório     | Rastreabilidade interna.                   |
| [X-Grd-Correlation-Id](#x-grd-correlation-id)    | uuid     | custom    | Req/Resp  | Opcional        | Propagação de contexto externo.            |

## Headers Padrões

### Cache-Control

O campo de cabeçalho `Cache-Control` DEVE ser usado para orientar mecanismos de cache tanto em requisições quanto em respostas.

#### Resposta

O cache DEVE ser configurado com a diretiva `max-age=<seconds>`, precedida por:

- `public`, quando o cache pode ser compartilhado entre múltiplos usuários;

```http
Cache-Control: public, max-age=<seconds>
```

- `private`, quando o cache é exclusivo do usuário final.

```http
Cache-Control: private, max-age=<seconds>
```

Para respostas que NÃO DEVEM ser armazenadas em cache, o cabeçalho abaixo DEVE ser usado:

```http
Cache-Control: no-store
```

Outras diretivas podem ser adicionadas conforme a necessidade, seguindo a [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111#section-5.2).

---

### Link

O cabeçalho `Link` PODE ser usado para fornecer links referente a paginação de resultados ou estado de uma entidade, indicado pelo parametro `rel`, seguindo as diretivas de [HATEOAS](https://restfulapi.net/hateoas) da especificação RESTful.

Exemplo em caso de paginação:

```http
link:
</api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
</api/v1/ledgers?page_token={next_page_token}>; rel="next",
</api/v1/ledgers?page_token={last_page_token}>; rel="last",
</api/v1/ledgers?page_token={first_page_token}>; rel="first"
```

Exemplo em caso de estado de uma entidade:

```http
Link: <https://{tenant_id}.guardia.finance/api/v1/ledgers/{entity_id}>; rel="ledger"
```

---

## Headers Customizados

Os headers customizados utilizados pela Guardia seguem o prefixo `X-Grd-*`, conforme convenção. Eles atendem a necessidades específicas de rastreabilidade, depuração e correlação entre sistemas.

### X-Grd-Debug

Header booleano opcional. Quando presente com o valor `true`, a resposta DEVE incluir o campo `debug` no payload, contendo informações adicionais conforme [especificação de payloads de resposta](./http-response-payloads.md#em-caso-de-debug).

```http
X-Grd-Debug: true
```

**Valor padrão:** `false`

> **ATENÇÃO:**
> O uso em ambientes de produção DEVE ser restrito, pois pode tornar o payload de resposta mais verboso e consumir mais recursos.

---

### X-Grd-Trace-Id

Header obrigatório retornado em **todas as respostas** das APIs da Guardia. Representa o identificador único da requisição.

- Gerado pela infraestrutura da Guardia.
- Facilita a correlação de logs e eventos entre serviços.
- O valor DEVE seguir o padrão UUIDv7, com marcação temporal conforme especificado na [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7).

```http
X-Grd-Trace-Id: <uuid>
```

---

### X-Grd-Correlation-Id

Header opcional enviado por sistemas externos. Utilizado para propagar contexto de rastreamento ao longo de chamadas distribuídas.

- Se presente na requisição, DEVE ser incluído na resposta.
- O valor DEVE seguir o padrão proposto pela [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).

```http
X-Grd-Correlation-Id: <uuid>
```

---

## Considerações de Segurança

- O uso de `X-Grd-Debug: true` em ambientes de produção DEVE ser controlado por escopo ou autenticação.
- Headers de rastreamento NÃO DEVEM conter dados sensíveis, PII ou segredos.
- Requisições devem ser validadas independentemente do status de autenticação.

### Notas adicionais

- Os headers utilizados em cada endpoint DEVE ser documentado no contrato OAS da API.
- Os headers aqui descritos são considerados **padrão mínimo** para qualquer API RESTful da Guardia.

## Referências

- [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
- [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111)
- [Cabeçalhos HTTP - HTTP | MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)
- [HATEOAS](https://restfulapi.net/hateoas)
