# **Governança da Guardia**  

Este documento estabelece a estrutura e os processos de governança da **Guardia**, refletindo nossos valores fundamentais e promovendo um ambiente transparente, eficiente e colaborativo.  

## **Propósito da Governança**  

Nosso objetivo é capacitar empresas de tecnologia financeira a escalarem suas operações com agilidade, ampliando o valor entregue aos clientes com **eficiência, segurança e confiança**. Criamos um ambiente onde cada pessoa envolvida — seja colaborador ou cliente — se sinta valorizada e inspirada a evoluir continuamente.  

## **Princípios de Governança da Guardia**  

A governança da **Guardia** é baseada nos seguintes princípios:  

### **Consenso e Comprometimento**  
Decisões são tomadas com base no consenso entre os participantes, garantindo alinhamento entre os objetivos do projeto e os interesses da comunidade. O comprometimento com a excelência e a participação ativa são incentivados para fortalecer o ecossistema.  

### **Transparência e Responsabilidade**  
A confiança é construída por meio da transparência em todos os processos e interações. Compartilhamos abertamente diretrizes, decisões e evoluções do projeto, garantindo que todos os stakeholders tenham clareza sobre suas responsabilidades.  

### **Inclusão e Diversidade**  
Valorizamos a diversidade de pensamento, experiência e perspectivas. Criamos um ambiente inclusivo onde todas as vozes são ouvidas e consideradas no processo decisório.  

### **Segurança e Confiabilidade**  
A integridade do sistema e a proteção dos dados são fundamentais para a estabilidade da plataforma. Seguimos práticas rigorosas para garantir que cada componente seja seguro e confiável.  

### **Eficiência e Agilidade**  
Adotamos uma abordagem pragmática e dinâmica, garantindo processos eficientes que permitem respostas ágeis às mudanças do mercado e às necessidades dos usuários.  

## **Estrutura de Governança**  

A governança da **Guardia** é baseada em três pilares: **Mantenedores, Colaboradores e Comitê Diretor**.  

### **Mantenedores**  
Os Mantenedores são responsáveis pela evolução do projeto e pela tomada de decisões estratégicas e técnicas. Eles definem o roadmap e as diretrizes do projeto, revisam e aprovam contribuições e garantem conformidade com as melhores práticas.  

A lista de Mantenedores pode ser encontrada no arquivo `CODEOWNERS` do repositório do projeto.

```
# CODEOWNERS - Responsible for code review

# Project Maintainers
* @guardia/mantenedores

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

# Compliance and Security
compliance/ @guardia/compliance
SECURITY.md @guardia/security
CODE_OF_CONDUCT.md @guardia/compliance
```

### **Colaboradores**  
Colaboradores são membros da comunidade que contribuem regularmente para o projeto. Eles submetem pull requests para revisão, auxiliam na resolução de problemas e são reconhecidos por suas contribuições consistentes.  

Os interessados devem seguir as diretrizes descritas no [CONTRIBUTING](../../docs/pt-BR/CONTRIBUTING.md).  

### **Comitê Diretor**  
O Comitê Diretor é responsável por garantir o alinhamento estratégico do projeto e mediar discussões organizacionais. Ele resolve disputas técnicas ou organizacionais, reavalia processos e políticas quando necessário e atua como instância final para decisões escaladas.  

O Comitê pode ser constituído por Mantenedores ativos, representantes da comunidade que se destacaram como Colaboradores e outros membros que se destacarem como líderes na comunidade.  

## **Processos de Governança**  

### **Processo de Tomada de Decisão**  

A **Guardia** adota um processo estruturado para garantir que todas as decisões sejam tomadas de maneira **transparente, eficiente e documentada**. Para isso, utilizamos três mecanismos principais: **Arquivos de Decisão Arquitetural (ADR)** para decisões técnicas, **Registros de Decisão de Produto (PDR)** para decisões de produto e **Requests for Comments (RFCs)** para discussões abertas e decisões estratégicas internas.

#### **Discussão Aberta**  
- Propostas e ideias são apresentadas nos canais internos apropriados.  
- Todos os membros da equipe são incentivados a contribuir com opiniões e feedback.  
- A diversidade de pensamento é valorizada para garantir soluções mais robustas e inovadoras.  

As decisões devem ser formalizadas por meio de um dos seguintes mecanismos:  

##### **Arquivos de Decisão Arquitetural (ADR)**  
As decisões técnicas devem ser documentadas em **Arquivos de Decisão Arquitetural (ADR)**, garantindo um registro histórico claro.  
Cada ADR deve conter:  
- **Título**: Nome da decisão.
- **Status**: (Proposto, Aprovado, Rejeitado, Em Revisão, Em Discussão).  
- **Contexto**: O problema ou necessidade que levou à decisão.  
- **Decisão**: A escolha feita e seu detalhamento.  
- **Justificativa**: As razões para a escolha e opções consideradas.  
- **Consequências**: Impactos positivos e negativos esperados.
- **(Opcional) PoC**: Caso a decisão seja provada de conceito (PoC), este deve ser informado.

Os ADRs quando globais devem ser armazenadas no repositório [guardia](https://github.com/guardiafinance/guardia/decisions/adrs) e quando específicos de um projeto devem ser armazenados no repositório do projeto e revisados periodicamente.

---

##### **Registros de Decisão de Produto (PDR)**  
As decisões relacionadas à evolução de produtos devem ser formalizadas por meio de um **PDR**.  
Cada PDR deve conter:  
- **Nome da Decisão** e **Data**.  
- **Status**: (Proposto, Aprovado, Rejeitado, Em Revisão, Em Discussão).   
- **Contexto**: O problema ou necessidade do produto.  
- **Decisão Tomada**: O detalhamento da decisão.  
- **Justificativa**: As razões para a escolha e opções consideradas.  
- **(Opcional) Banchmark**: Caso a decisão seja baseada em um benchmark, este deve ser informado.  

Os PDRs quando globais devem ser armazenadas no repositório [guardia](https://github.com/guardiafinance/guardia/decisions/pdrs) e quando específicos de um projeto devem ser armazenados no repositório do projeto e revisados periodicamente.

---

##### **Requests for Comments (RFCs)**  
Mudanças significativas em processos, tecnologias ou estratégias devem ser discutidas por meio de **RFCs**.  

O processo segue os seguintes passos:  
1. **Proposta**: Qualquer membro pode propor uma RFC, documentando o problema e possíveis soluções.  
2. **Discussão**: A proposta é aberta à comunidade interna para contribuições e refinamento.  
3. **Avaliação**: O Comitê Diretor analisa o feedback e decide sobre a adoção ou rejeição da proposta.  
4. **Implementação**: Se aprovada, a decisão é documentada e um plano de execução é definido.  

As RFCs promovem um ambiente colaborativo, onde decisões importantes são debatidas de forma estruturada antes da implementação.  

#### **Busca por Consenso**  
- Sempre que possível, busca-se um acordo entre os envolvidos, garantindo que todas as perspectivas sejam consideradas.  
- As decisões devem priorizar **eficiência e agilidade**, sem comprometer a qualidade.  
- A transparência é garantida por meio da documentação detalhada e da comunicação aberta com os stakeholders.  

#### **Submissão para o Comitê Diretor**  
Caso o consenso não seja alcançado em uma decisão técnica (ADR), de produto (PDR) ou estratégica (RFC), a questão será formalmente submetida ao **Comitê Diretor**. Ele tomará a decisão final com base nos **Princípios da Guardia** e no **direcionamento estratégico do projeto**.  

Todas as resoluções devem ser **documentadas e comunicadas**, reforçando a **transparência e a confiabilidade** da governança da **Guardia**.


#### **Discussão Aberta**  
- Propostas e ideias são discutidas publicamente nos canais do projeto.  
- Todos os membros da comunidade são incentivados a fornecer feedback.  
- A diversidade de pensamento é valorizada para garantir soluções robustas e inovadoras.  

#### **Busca por Consenso**  
- São feitos esforços para alcançar um acordo entre os participantes ativos.  
- As decisões devem priorizar **eficiência e agilidade** sem comprometer a qualidade.  
- A transparência é garantida, documentando os critérios e justificativas de cada decisão.  

#### **Escalação para o Comitê Diretor**  
- Se o consenso não for possível, a questão será formalmente submetida ao **Comitê Diretor**.  
- O Comitê analisará todas as perspectivas e tomará a decisão com base nos **Princípios da Guardia** e no **direcionamento estratégico do projeto**.  
- A decisão será documentada e comunicada para garantir **clareza, estabilidade e segurança**.

---

### **Inclusão de Novos Membros**  

#### **Critérios para Convite**  
- O candidato deve ser um **Colaborador ativo**, com histórico consistente de contribuições significativas.  
- O convite para se tornar **Mantenedor** pode ser feito por um Mantenedor ou pelo Comitê Diretor.  
- A inclusão no **Comitê Diretor** é aprovada apenas por consenso entre seus membros.  

#### **Convite e Aceitação**  
- O Comitê Diretor avalia o candidato e, se aprovado, ele recebe um **e-mail de convite** para se tornar Mantenedor.  
- O candidato tem **7 dias** para aceitar o convite.  
- Se o convite expirar, ele poderá ser considerado novamente no futuro.  

#### **Integração e Boas-Vindas**  
- Se o convite for aceito, o novo Mantenedor recebe um **e-mail de boas-vindas** com diretrizes e responsabilidades.  
- Ele terá acesso à documentação e suporte de outros membros para sua integração no projeto.  

---

### **Resolução de Conflitos**  

A resolução de conflitos deve sempre estar alinhada aos **Princípios de Governança da Guardia**, garantindo que as decisões sejam tomadas de forma **transparente, inclusiva e responsável**.  

#### **Disputas Técnicas**  
- Devem ser analisadas e resolvidas pelos **Mantenedores**, seguindo os princípios de **Eficiência e Agilidade**, assegurando que as decisões sejam rápidas e eficazes, sem comprometer a qualidade.  
- As discussões devem buscar **Consenso e Comprometimento**, garantindo que todas as partes envolvidas contribuam ativamente para a solução do problema.  
- Sempre que possível, a **Inclusão e Diversidade** devem ser incentivadas, permitindo que diferentes perspectivas sejam consideradas para encontrar a melhor solução.  
- Caso um consenso não seja alcançado, o conflito pode ser escalado para o **Comitê Diretor**, que tomará a decisão final com base nos princípios da Guardia.  

#### **Questões Organizacionais e Estratégicas**  
- Devem ser avaliadas pelo **Comitê Diretor**, assegurando que a decisão esteja alinhada com os princípios de **Transparência e Responsabilidade**, garantindo que todos os stakeholders tenham clareza sobre o impacto das resoluções.  
- As decisões estratégicas devem priorizar a **Segurança e Confiabilidade**, mantendo a estabilidade da plataforma e assegurando que todas as resoluções estejam em conformidade com as melhores práticas.  
- O processo de tomada de decisão deve reforçar **Estabilidade e Integridade**, garantindo um ambiente de governança sólido e confiável para todos os participantes.  

Todas as resoluções de conflitos devem ser **documentadas e comunicadas**, reforçando o compromisso da **Guardia** com a **transparência** e a **confiança na governança do projeto**.  


## **Diretrizes Complementares**  

Todos os membros e contribuidores devem seguir as diretrizes da **Guardia**:  

- [Código de Conduta](CODE_OF_CONDUCT.md)  
- [Compliance by Design](COMPLIANCE.md)
- [Segurity by Design](SECURITY.md)  
- [Políticas de Privacidade](PRIVACY.md)  
- [Políticas de Cookies](COOKIES.md)  

Além disso, todos os contribuidores devem assinar o CNCF [Contributor License Agreement (CLA)](CLA.md), conforme descrito no documento oficial.  