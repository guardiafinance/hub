---
sidebar_position: 0
---

# Entidades

Esta especificação define o modelo estrutural mínimo que todas as entidades da plataforma Guardia DEVEM seguir. O objetivo é garantir consistência entre serviços, interoperabilidade entre domínios e aderência a requisitos de segurança, rastreabilidade e conformidade desde a concepção.

Essa estrutura base se aplica a qualquer objeto persistente e rastreável da plataforma, abrangendo APIs, bases de dados, eventos de domínio, integrações externas e demais mecanismos de representação de entidades.

Ao adotar esse padrão, toda entidade:
- Possui um identificador único e global;
- É versionada com controle explícito de alterações;
- Mantém histórico completo e auditável;
- Pode ser integrada e eventualmente descartada sem perda de rastreabilidade.

A aplicação dessa estrutura reduz inconsistências, facilita integrações e elimina lacunas de auditoria que poderiam comprometer a conformidade com normas como **LGPD**, **SOC 2** e **ISO 27001**.

Além disso, o modelo reforça os princípios do **Compliance by Design**, assegurando:
- Identificação única (`entity_id`);
- Rastreabilidade temporal (`created_at`, `updated_at`, `discarded_at`);
- Integridade e controle de concorrência (`version`);
- Preservação de histórico e reversibilidade (`history`);
- Integração e interoperabilidade com sistemas externos (`external_entity_id`, `metadata`).

### Estrutura base

A estrutura base de uma entidade na Guardia DEVE conter os seguintes campos:

| Campo                | Tipo         | Obrigatório | Finalidade                                                                 |
|----------------------|--------------|-------------|---------------------------------------------------------------------------|
| `entity_id`          | UUID v7      | Sim         | Identificador único global. Garante unicidade e ordenação temporal.       |
| `entity_type`        | string       | Sim         | Tipo lógico da entidade (ex: ledger, chapter, asset).                      |
| `external_entity_id` | string       | Não         | ID externo fornecido por sistemas clientes.                               |
| `created_at`         | datetime     | Sim         | Data/hora de criação (ISO 8601).                                          |
| `updated_at`         | datetime     | Não         | Última alteração registrada (ISO 8601).                                   |
| `discarded_at`       | datetime     | Não         | Marca lógica de descarte (soft delete).                                   |
| `metadata`           | JSON         | Não         | Parâmetros adicionais customizáveis por chave-valor (máx. 10KB).          |
| `version`            | integer      | Sim         | Número sequencial de controle de versão.                                  |
| `history`            | array        | Não         | Registro completo de alterações e versões anteriores.                     |

### Requisitos detalhados

#### `entity_id`
- DEVE ser único, imutável e gerado pelo sistema.
- DEVE implementar o UUID v7 conforme a [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7) assegurando ordenação temporal.

#### `entity_type`
- DEVE pertencer a uma lista controlada de entidades conhecidas pelo sistema.

#### `external_entity_id`
- PODE ser nulo.
- PODE ser implementado qualquer versao de UUID ou hash de ate 36 caracteres.
- QUANDO presente, DEVE ser único dentro do `entity_type`.
- Ideal para referências cruzadas com sistemas legados ou externos.

#### `created_at`
- DEVE ser um datetime em UTC formatado conforme a [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- DEVE ser gerado automaticamente na criação.
- NÃO PODE ser alterado após a criação.

#### `updated_at`
- DEVE ser um datetime em UTC formatado conforme a [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- DEVE ser atualizado a cada modificação persistente.
- Utilizado para controle de concorrência e sincronização.

#### `discarded_at`
- DEVE ser um datetime em UTC formatado conforme a [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- PODE ser nulo.
- Quando preenchido, indica soft delete. A entidade permanece no sistema para fins de rastreabilidade.

#### `metadata`
- DEVE ser um JSON Object.
- Chave e valor DEVEM ser strings.
- DEVE ter seguir o tamanho ideal de 4KB sempre que possível e não DEVE ultrapassar 10KB.
- Atualizações DEVEM ser feitas via JSON Merge Patch (RFC 7386).
- NÃO DEVE conter dados sensíveis ou pessoais sem previsão legal.

#### `version`
- Inicializa em 1 e é incrementado automaticamente junto com o `updated_at`.

#### `history`
- Armazena snapshots de versões anteriores.
- Utilizado para auditoria, rollback e investigação.
- O histórico DEVE ser omitido das respostas temporais (create, update, delete e get).
- O histórico DEVE ser fornecido nas respostas de leitura (get) quando solicitado pelo cliente no endpoint `api/v1/<entity_type>/<entity_id>/history`.

### Quando aplicar

Este modelo DEVE ser adotado sempre que:
- Um novo recurso de domínio for modelado;
- APIs forem expostas internamente ou externamente;
- Eventos de domínio forem gerados;
- Dados precisarem de unicidade, rastreabilidade, reversibilidade ou interoperabilidade.

> IMPORTANTE: Exceções DEVEM ser justificadas e aprovadas pelo Comitê Diretivo e registradas em um [Registro de Decisão de Produto (PDR)](../community/governance/index.md#registros-de-decisão-de-produto-pdr).

### Referências
- [RFC 9562: UUID Version 7](https://datatracker.ietf.org/doc/html/rfc9562)
- [RFC 7386: JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7386)

