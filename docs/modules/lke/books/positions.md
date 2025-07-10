---
sidebar_position: 2
keywords: [guardia core banking, transactional ledger, ledger as a service, modulo de ledger da guardia, books, ias-1, ias-2, ias-38, ifrs-9]
---

# Posição de Saldo

No modelo contábil da Guardia, **Position** representa o estado consolidado de um *book* em determinado momento, a partir da interpretação dos lançamentos contábeis (**entries**) registrados com base na **natureza da conta** (`nature = creditor` ou `debitor`).

Cada Position reflete uma leitura específica sobre o saldo do *book*, variando conforme o estágio das entries consideradas no cálculo. As Positions são fundamentais para oferecer uma visão granular, auditável e operacionalmente precisa dos saldos, tanto para fins contábeis quanto para aplicações em tempo real.

A seguir, apresentamos os quatro tipos de Positions suportados pela plataforma:

### `Posted`

É o saldo **efetivamente finalizado**, calculado exclusivamente com base nas entries com `status = posted`. Representa o valor contabilizado no livro razão, imutável, utilizado para reconciliações, relatórios oficiais e auditoria.

### `Available`

Reflete o valor **disponível para movimentação imediata**, a partir do saldo `posted`, descontando lançamentos `pending` com `side = debit`. Serve como referência para autorizações operacionais, evitando uso indevido de saldo ainda comprometido.

### `Confirmable`

Representa o saldo líquido das entries com `status = pending` que já foram **validadas internamente** e estão aptas a serem postadas. É útil em fluxos de pré-liquidação, compensação ou confirmação assíncrona.

### `Provisional`

É uma **projeção do saldo futuro**, calculada somando o saldo `posted` com o saldo `confirmable`. Indica o valor estimado caso todos os lançamentos pendentes válidos sejam efetivamente registrados no livro.

---

O cálculo de cada Position respeita a **natureza (`nature`) do book**, ou seja:

* Em books com `nature = creditor`, `credits` aumentam o saldo e `debits` reduzem.
* Em books com `nature = debitor`, `debits` aumentam o saldo e `credits` reduzem.

Essa distinção garante que os valores refletidos em cada Position estejam sempre alinhados com os princípios contábeis, permitindo interpretações consistentes e precisas por parte dos sistemas financeiros, contábeis e operacionais integrados ao Ledger da Guardia.


## Posição de Saldo – Books com `nature = creditor`

| **Posição de Saldo**      | **Cálculo de `amount`**                                                         | **Entries Utilizadas**                                                                             | **Lógica de Side**                               | **Descrição Funcional**                                                                |
|------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|--------------------------------------------------|------------------------------------------------------------------------------------------|
| `Posted`         | ∑ dos valores de entries `posted` com `side = credit` − ∑ com `side = debit`     | Entries com `status = posted`                                                                       | `credit` aumenta, `debit` reduz                  | Valor líquido já finalizado no livro.                                                   |
| `Available`      | Saldo `posted` − ∑ de entries `pending` com `side = debit`                       | Entries `posted` + entries `pending` com `side = debit`                                             | `credit` aumenta, `debit` reduz                  | Valor disponível para novas transações.                                                 |
| `Confirmable`    | ∑ de entries `pending` prontas para `post` (`side = credit`) − (`side = debit`) | Entries `pending` que já passaram por validações internas                                           | `credit` aumenta, `debit` reduz                  | Lançamentos pendentes prontos para serem postados.                                      |
| `Provisional`    | Saldo `posted` + saldo `confirmable`                                            | Todas as entries `posted` + entries `pending` validadas                                             | `credit` aumenta, `debit` reduz                  | Projeção do saldo futuro assumindo que tudo será postado.                               |

---

## Posição de Saldo – Books com `nature = debitor`

| **Posição de Saldo**      | **Cálculo de `amount`**                                                         | **Entries Utilizadas**                                                                             | **Lógica de Side**                               | **Descrição Funcional**                                                                |
|------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|--------------------------------------------------|------------------------------------------------------------------------------------------|
| `Posted`         | ∑ dos valores de entries `posted` com `side = debit` − ∑ com `side = credit`     | Entries com `status = posted`                                                                       | `debit` aumenta, `credit` reduz                  | Valor líquido já finalizado no livro.                                                   |
| `Available`      | Saldo `posted` − ∑ de entries `pending` com `side = debit`                       | Entries `posted` + entries `pending` com `side = debit`                                             | `debit` aumenta, `credit` reduz                  | Valor disponível para novas transações.                                                 |
| `Confirmable`    | ∑ de entries `pending` prontas para `post` (`side = debit`) − (`side = credit`) | Entries `pending` que já passaram por validações internas                                           | `debit` aumenta, `credit` reduz                  | Lançamentos pendentes prontos para serem postados.                                      |
| `Provisional`    | Saldo `posted` + saldo `confirmable`                                            | Todas as entries `posted` + entries `pending` validadas                                             | `debit` aumenta, `credit` reduz                  | Projeção do saldo futuro assumindo que tudo será postado.                               |
