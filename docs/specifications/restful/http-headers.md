---
sidebar_position: 2
---

# Headers

Esta especificação descreve os headers padrão e customizados adotados pela Guardia em suas APIs RESTful.

Seu objetivo é promover consistência entre interfaces, garantir previsibilidade no consumo de dados e facilitar a interoperabilidade entre módulos internos, serviços externos e integrações de parceiros.

A padronização dos headers contribui para rastreabilidade eficiente, depuração segura e escalabilidade das integrações.

## Sumário

| Header                  | Tipo     | Categoria | Direção   | Obrigatoriedade | Finalidade                                 |
|-------------------------|----------|-----------|-----------|-----------------|--------------------------------------------|
| [Cache-Control](#cache-control)           | string   | padrão    | Response  | Opcional        | Diretivas de controle de cache            |
| [X-Grd-Debug](#x-grd-debug)             | booleano | custom    | Request   | Opcional        | Ativa retorno de informações de debug     |
| [X-Grd-Trace-Id](#x-grd-trace-id)          | uuid     | custom    | Response  | Obrigatório     | Rastreabilidade interna                   |
| [X-Grd-Correlation-Id](#x-grd-correlation-id)    | uuid     | custom    | Req/Resp  | Opcional        | Propagação de contexto externo            |


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

Para respostas que **NÃO DEVEM** ser armazenadas em cache, o cabeçalho abaixo DEVE ser usado:

```http
Cache-Control: no-store
```

Outras diretivas podem ser adicionadas conforme a necessidade, seguindo a [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111#section-5.2).

---

## Headers Customizados

Os headers customizados utilizados pela Guardia seguem o prefixo `X-Grd-*`, conforme convenção. Eles atendem a necessidades específicas de rastreabilidade, depuração e correlação entre sistemas.

### X-Grd-Debug

Header booleano opcional. Quando presente com o valor `true`, a resposta DEVE incluir o campo `debug` no payload, contendo informações adicionais conforme [especificação de payloads de resposta](./http-response-payloads.md#debug).

```http
X-Grd-Debug: true
```

**Valor padrão:** `false`

**Atenção:** o uso em ambientes de produção DEVE ser restrito, pois pode expor informações sensíveis.

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
- Headers de rastreamento **NÃO DEVEM** conter dados sensíveis, PII ou segredos.
- Requisições devem ser validadas independentemente do status de autenticação.

---

## Referências

- [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
- [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111)
- [Cabeçalhos HTTP - HTTP | MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)