---
sidebar_position: 1
keywords: [guardia core banking, transactional ledger, ledger as a service, modulo de ledger da guardia, books, ias-1, ias-2, ias-38, ifrs-9]
---

## Fundamentação da Estrutura do Book

Este documento descreve os fundamentos técnicos e normativos que embasam o conceito de **Book** como unidade contábil na arquitetura do ledger da Guardia. A proposta segue o princípio de **Compliance by Design**, assegurando que as decisões de modelagem estejam em conformidade com as normas internacionais de contabilidade desde sua concepção.

### Referenciais Normativos

A estrutura do Book tem aderência direta a normas emitidas pelo IASB (International Accounting Standards Board) e adotadas internacionalmente por instituições financeiras e sistemas contábeis. As principais normas utilizadas como base são:

#### IAS 1 – Apresentação das Demonstrações Financeiras

* Define os componentes formais das demonstrações contábeis (ativo, passivo, receita, despesa, patrimônio líquido)
* Exige uma apresentação clara, segregada e temporal das posições de saldo
* Justifica a separação dos books por natureza contábil

#### IAS 2 – Estoques

* Fundamenta a representação de books voltados a controle de itens físicos e mercadorias, mesmo que não financeiros
* Define critérios de avaliação e mensuração aplicáveis a books com variação de valor ao longo do tempo

#### IAS 38 – Ativos Intangíveis

* Aplica-se à representação contábil de books associados a ativos digitais, software próprio, licenças ou direitos de uso
* Reforça a necessidade de distinguir entre natureza do ativo, método de amortização e controle de valor residual

#### IFRS 9 – Instrumentos Financeiros

* Norma estruturante para representação de ativos e passivos financeiros em books
* Define classificações (ativo financeiro, passivo financeiro, instrumento de capital), critérios de mensuração (custo amortizado, valor justo) e regras de reconhecimento e baixa
* Justifica o vínculo direto entre books e assets financeiros no ledger

### Abrangência e Compatibilidade

Embora este documento tenha como base principal as normas IAS/IFRS emitidas pelo IASB, diversos princípios aqui adotados mantêm forte convergência com práticas estabelecidas pelo US GAAP e com os requisitos do COSIF (Plano Contábil das Instituições do Sistema Financeiro Nacional). Em ambos os casos, há alinhamento quanto à segregação de contas por natureza, controle patrimonial, reconciliação de saldos e rastreabilidade contábil.

Além disso, a modelagem adotada também demonstra compatibilidade com outros referenciais contábeis que se baseiam ou se inspiram nos princípios do IASB — incluindo normativas locais de países da América Latina, Europa e Ásia que aplicam versões convergentes do IFRS. Isso amplia a aplicabilidade da estrutura de Books para diferentes jurisdições, facilitando a adoção em ambientes multinacionais ou regulados por múltiplos frameworks.
