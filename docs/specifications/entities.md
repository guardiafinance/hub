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
| [`entity_id`](#entity_id)          | UUID v7      | Sim         | Identificador único global. Garante unicidade e ordenação temporal.       |
| [`entity_type`](#entity_type)        | string       | Sim         | Tipo lógico da entidade (ex: ledger, chapter, asset).                      |
| [`external_entity_id`](#external_entity_id) | string       | Não         | ID externo fornecido por sistemas clientes (máx. 36 caracteres).          |
| [`created_at`](#created_at)         | datetime     | Sim         | Data/hora de criação em UTC.                                   |
| [`updated_at`](#updated_at)         | datetime     | Sim         | Última alteração registrada em UTC.                            |
| [`discarded_at`](#discarded_at)       | datetime     | Não         | Marca lógica de descarte em UTC.                               |
| [`metadata`](#metadata)           | JSON         | Não         | Parâmetros chave e valor (máx. 10KB).                                     |
| [`version`](#version)            | integer      | Sim         | Número sequencial de controle de versão.                                  |
| [`history`](#history)            | array        | Não         | Registro completo de alterações e versões anteriores.                     |

### Propriedades detalhadas

#### `entity_id`
- DEVE ser único, imutável e gerado pelo sistema.
- DEVE implementar o UUID v7 conforme a [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7) assegurando ordenação temporal.

#### `entity_type`
- DEVE pertencer a uma lista controlada de entidades conhecidas pelo sistema.

#### `external_entity_id`
- PODE ser nulo.
- DEVE ter no máximo 36 caracteres.
- QUANDO presente, DEVE ser único dentro do `entity_type`.
- Ideal para referências cruzadas com sistemas legados ou externos.

#### `created_at`
- DEVE ser um datetime em UTC formatado conforme a [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- DEVE ser gerado automaticamente na criação.
- NÃO PODE ser alterado após a criação.

#### `updated_at`
- DEVE ser um datetime em UTC formatado conforme a [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- DEVE ser atualizado a cada modificação persistente.
- Na criação, DEVE assumir o mesmo valor de `created_at`.
- No descarte, DEVE assumir o mesmo valor de `discarded_at`.
- Utilizado para controle de concorrência e sincronização.

#### `discarded_at`
- DEVE ser um datetime em UTC formatado conforme a [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339).
- PODE ser nulo.
- Quando preenchido, indica soft delete. A entidade permanece no sistema para fins de rastreabilidade.

#### `metadata`
- DEVE ser um JSON Object.
- Chave e valor DEVEM ser strings.
- DEVE ter seguir o tamanho ideal de 4KB sempre que possível e não DEVE ultrapassar 10KB.
- Atualizações DEVEM ser feitas via JSON Merge Patch (RFC 7386).
- NÃO DEVE conter dados sensíveis ou pessoais sem previsão legal.
- Valores PODEM ser armazenados criptografados, com impacto na performance.

#### `version`
- Inicializa em 1 e é incrementado automaticamente junto com o `updated_at`.
- NUNCA é reiniciado, mesmo após restauração de entidade descartada.
- Em caso de conflito de versão, a última versão é preservada, descartando a que conflitou.

#### `history`
- Armazena snapshots de versões anteriores.
- Utilizado para auditoria, rollback e investigação.
- Por padrão, armazena as últimas 10 versões mais recentes por até 365 dias.
- O histórico DEVE ser omitido das respostas temporais (create, update, delete e get).
- DEVE ser omitido dos eventos de domínio.
- O histórico DEVE ser fornecido nas respostas de leitura (get) quando solicitado pelo cliente no endpoint `api/v1/<entity_type>/<entity_id>/history`.
- O endpoint de histórico retorna uma lista de até 10 registros históricos da mesma entidade.
- Valores PODEM ser armazenados criptografados, com impacto na performance.

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
- [RFC 3339: Date and Time on the Internet: Timestamps](https://datatracker.ietf.org/doc/html/rfc3339)
