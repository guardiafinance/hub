---
sidebar_position: 0
---

# RESTful APIs

Esta especificação consolida as diretrizes para construção, consumo e documentação de APIs RESTful na plataforma Guardia. Seu objetivo é garantir padronização nas respostas e comportamentos, promovendo interoperabilidade, rastreabilidade e clareza para consumidores internos e externos.

As APIs REST da Guardia seguem os padrões definidos pelas RFCs oficiais do protocolo HTTP, com ajustes necessários resolucao de possiveis ambiguidades e aderência aos princípios de [Compliance by Design](../../community/governance/COMPLIANCE.md).


A especificação RESTful está estruturada em módulos reutilizáveis e versionáveis, que cobrem os seguintes aspectos:

| Tema | Descrição |
|------|-----------|
| [Status Codes](./http-status-code.md) | Lista dos status HTTP permitidos e regras de uso. |
| [Payloads de Resposta](./http-response-payloads.md) | Formato unificado de respostas para sucesso e erro. |
| [Paginação](./http-pagination.md) | Estrutura padrão para navegação entre recursos paginados. |
| [Ordenação](./http-sorting.md) *(em desenvolvimento)* | Regras para uso de parâmetros `order_by` e `sort`. |
| [Filtragem](./http-filtering.md) *(em desenvolvimento)* | Convenções para filtros em query string e metadata. |
| [Compactação](./http-compression.md) *(em desenvolvimento)* | Padrão de compactação de payloads. |


> **IMPORTANTE:**
> Todas as regras aqui descritas DEVEM ser aplicadas a qualquer endpoint HTTP implementado na plataforma, salvo exceções justificadas e documentadas em ADR.

