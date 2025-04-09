---
sidebar_position: 2
---

# Governança da Guardia

Este documento estabelece a estrutura e os processos de governança da **Guardia**, refletindo nossos valores fundamentais e promovendo um ambiente transparente, eficiente e colaborativo.

## Princípios de Governança

A governança da **Guardia** é baseada nos seguintes princípios:

### Consenso e Comprometimento
Decisões são tomadas com base no consenso entre os participantes, garantindo alinhamento entre os objetivos do projeto e os interesses da comunidade. O comprometimento com a excelência e a participação ativa são incentivados para fortalecer o ecossistema.

### Transparência e Responsabilidade
A confiança é construída por meio da transparência em todos os processos e interações. Compartilhamos abertamente diretrizes, decisões e evoluções do projeto, garantindo que todos os stakeholders tenham clareza sobre suas responsabilidades.

### Inclusão e Diversidade
Valorizamos a diversidade de pensamento, experiência e perspectivas. Criamos um ambiente inclusivo onde todas as vozes são ouvidas e consideradas no processo decisório.

### Segurança e Confiabilidade
A integridade do sistema e a proteção dos dados são fundamentais para a estabilidade da plataforma. Seguimos práticas rigorosas para garantir que cada componente seja seguro e confiável.

### Eficiência e Agilidade
Adotamos uma abordagem pragmática e dinâmica, garantindo processos eficientes que permitem respostas ágeis às mudanças do mercado e às necessidades dos usuários.

## Estrutura de Governança

A governança da **Guardia** é baseada em três pilares: **Mantenedores, Colaboradores e Comitê Diretor**.

### **Mantenedores**
Os Mantenedores são responsáveis pela execução tática, evolução do projeto e tomada de decisões técnicas. Eles definem o roadmap e as diretrizes do projeto, revisam e aprovam contribuições e garantem conformidade com as melhores práticas.

A lista de Mantenedores pode ser encontrada no arquivo `CODEOWNERS` do repositório do projeto.

```
# CODEOWNERS - Responsible for code review

# Project Maintainers
* @guardia/{squad name}

# Documentation
docs/ @usuario1 @usuario2

# Source Code
backend/ @usuario3 @usuario4
frontend/ @usuario5 @usuario6
database/ @usuario7

# Configuration and Infrastructure
.github/ @guardia/mantenedores
infra/ @devops1 @devops2
Dockerfile @usuario9
*.yml @usuario9

# Políticas e Governança
GOVERNANCE @guardia/governance
COMPLIANCE @guardia/compliance
SECURITY @guardia/security
CODE_OF_CONDUCT @guardia/compliance
LICENSE @guardia/compliance
```

### Colaboradores
Colaboradores são membros da comunidade que contribuem regularmente para o projeto. Eles submetem pull requests para revisão, auxiliam na resolução de problemas e são reconhecidos por suas contribuições consistentes.

Os interessados devem seguir as diretrizes descritas no [Guia de Contribuição](../../docs/pt-BR/CONTRIBUTING.md).

### Comitê Diretor
O Comitê Diretor é responsável por garantir o alinhamento estratégico do projeto e mediar discussões organizacionais. Ele resolve disputas técnicas ou organizacionais, reavalia processos e políticas quando necessário e atua como instância final para decisões escaladas.

O Comitê Diretor pode ser composto por Mantenedores ativos, representantes da comunidade com histórico consistente de contribuição e outros membros que tenham se destacado como liderança ou especialistas em tecnologia do mercado financeiro. A inclusão de novos integrantes está sujeita à aprovação dos membros atuais do Comitê.

## Processos de Governança

### Tomada de Decisão

A **Guardia** adota um processo estruturado para garantir que todas as decisões sejam tomadas de maneira **transparente, eficiente e documentada**. Utilizamos três mecanismos principais: **ADRs** para decisões arquiteturais que impactam a evolução técnica do projeto, **PDRs** para decisões sobre a continuidade e direcionamento de produtos, e **RFCs** para mudanças estratégicas de interesse interno e comunitário.

- Qualquer pessoa da comunidade pode abrir uma [Discussão](#) para propor ideias, levantar dúvidas ou sugerir melhorias.
- A equipe é constantemente incentivada a participar com opiniões, questionamentos e feedback construtivo.
- Valorizamos a diversidade de pensamento como um diferencial para alcançar soluções mais robustas, inclusivas e inovadoras.

As decisões devem ser formalizadas por meio de um dos seguintes mecanismos:

#### Registros de Decisão Arquitetural (ADR)
As decisões técnicas devem ser documentadas em **Registros de Decisão Arquitetural (ADR)**, garantindo um registro histórico claro.
Cada ADR deve conter:
- **Título**: Nome da decisão.
- **Data**: Data em que a decisão foi tomada
- **Status**: (Proposto, Aprovado, Rejeitado, Em Revisão, Em Discussão)
- **Contexto**: O problema ou necessidade que levou à decisão.
- **Decisão**: A escolha feita e seu detalhamento.
- **Justificativa**: As razões para a escolha e opções consideradas.
- **Consequências**: Impactos positivos e negativos esperados.
- **(Opcional) PoC**: Caso a decisão seja embasada por Prova de Conceito (PoC), este deve ser informado.

Os ADRs devem ser armazenados no repositório do projeto e revisados periodicamente.

---

#### Registros de Decisão de Produto (PDR)
As decisões relacionadas à evolução de produtos devem ser formalizadas por meio de um **PDR**.
Cada PDR deve conter:
- **Título**: Nome da decisão.
- **Data**: Data em que a decisão foi tomada
- **Status**: (Proposto, Aprovado, Rejeitado, Em Revisão, Em Discussão)
- **Contexto**: O problema ou necessidade que levou à decisão.
- **Decisão**: A escolha feita e seu detalhamento.
- **Justificativa**: As razões para a escolha e opções consideradas.
- **Consequências**: Impactos positivos e negativos esperados.
- **(Opcional) Benchmark**: Caso a decisão seja embasada por um benchmark, este deve ser informado.

Os PDRs devem ser armazenados no repositório do projeto e revisados periodicamente.

---

#### Requests for Comments (RFCs)
Mudanças significativas em processos, tecnologias ou estratégias devem ser discutidas por meio de **RFCs**.

O processo segue os seguintes passos:
1. **Proposta**: Qualquer membro pode propor uma RFC, documentando o problema e possíveis soluções.
2. **Discussão**: A proposta é aberta à comunidade interna para contribuições e refinamento.
3. **Avaliação**: O Comitê Diretor analisa o feedback e decide sobre a adoção ou rejeição da proposta.
4. **Implementação**: Se aprovada, a decisão é documentada e um plano de execução é definido.

---

#### Busca por Consenso
- Sempre que possível, busca-se um acordo entre os envolvidos, garantindo que todas as perspectivas sejam consideradas.
- As decisões devem priorizar eficiência e agilidade, sem comprometer a qualidade.
- A transparência é garantida por meio da documentação detalhada e da comunicação aberta com os stakeholders.

#### Submissão para o Comitê Diretor
Caso o consenso não seja alcançado em uma decisão técnica (ADR), de produto (PDR) ou estratégica (RFC), a questão será formalmente submetida ao Comitê Diretor. Ele tomará a decisão final com base nos Princípios da Guardia e no direcionamento estratégico do projeto.

Todas as resoluções devem ser documentadas e comunicadas, reforçando a transparência e a confiabilidade da governança da Guardia.

---

### Inclusão de Novos Membros

#### Critérios para Convite
- Ter pelo menos 1 contribuição significativa nos últimos 3 meses e demonstrar alinhamento com os valores e práticas do projeto.
- O convite para se tornar Mantenedor deve partir de um Mantenedor e ser aprovado por pelo menos 1 membro do Comitê Diretor.
- A entrada no Comitê Diretor exige aprovação unânime dos seus membros.

#### Convite e Aceitação
- O Comitê Diretor avalia o candidato e, se aprovado, ele recebe um e-mail de convite para se tornar Mantenedor.
- O candidato tem 7 dias para aceitar o convite.
- Se o convite expirar, ele poderá ser considerado novamente no futuro.

#### Integração e Boas-Vindas
- Se o convite for aceito, o novo Mantenedor recebe um e-mail de boas-vindas com diretrizes e responsabilidades.
- Ele terá acesso à documentação e suporte de outros membros para sua integração no projeto.

---

### Resolução de Conflitos

A resolução de conflitos deve sempre estar alinhada aos Princípios de Governança da Guardia, garantindo que as decisões sejam tomadas de forma transparente, inclusiva e responsável.

#### Disputas Técnicas
- Devem ser analisadas e resolvidas pelos Mantenedores, seguindo os princípios de Eficiência e Agilidade.
- As discussões devem buscar Consenso e Comprometimento, garantindo participação ativa.
- Sempre que possível, deve-se incentivar a Inclusão e Diversidade, acolhendo diferentes perspectivas.
- Caso não haja consenso, o conflito pode ser escalado ao Comitê Diretor, que tomará a decisão final.

#### Questões Organizacionais e Estratégicas
- São avaliadas pelo Comitê Diretor, considerando os princípios de Transparência e Responsabilidade.
- As decisões devem priorizar Segurança e Confiabilidade e garantir estabilidade à plataforma.
- Todo processo deve reforçar Estabilidade e Integridade, promovendo um ambiente de governança confiável.

Todas as resoluções de conflitos devem ser documentadas e comunicadas, reforçando o compromisso da Guardia com a transparência e a confiança na governança do projeto.

---

## Diretrizes Complementares

Todos os membros e contribuidores devem seguir as diretrizes da Guardia:

- [Código de Conduta](./CODE_OF_CONDUCT.md)
- [Compliance by Design](./COMPLIANCE.md)


Além disso, todos os contribuidores devem assinar o CNCF [Contributor License Agreement (CLA)](CLA.md), conforme descrito no documento oficial.