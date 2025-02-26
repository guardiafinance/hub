# **Política de Segurança da Informação**  

## **1. Introdução**  

Na **Guardia**, a segurança das informações de nossos clientes é nossa prioridade absoluta. Por meio de um programa abrangente de segurança, trabalhamos continuamente para conquistar e manter a confiança de nossos clientes através da proteção rigorosa de seus dados. Nossa abordagem baseia-se em dois pilares fundamentais: o modelo **Zero Trust** para proteção de dados e os princípios de **Compliance and Security by Design**, garantindo que todos os nossos produtos e serviços sejam desenvolvidos com segurança integrada e em total conformidade com normas e regulamentações vigentes.  

**Trust Center:** [https://trust.guardia.com.br](https://trust.guardia.com.br)  

---

## **2. Compliance by Design**  

O **Compliance by Design** é um modelo que incorpora princípios de conformidade regulatória desde a concepção de sistemas, processos e produtos. Essa abordagem evita a necessidade de correções posteriores e garante aderência contínua às regulamentações.  

### **Princípios**  

- **_Automação da Conformidade_** – Implementação de controles e verificações automatizadas nos processos e sistemas, garantindo conformidade contínua e reduzindo riscos de não conformidade de forma eficiente e escalável.  

- **_Zero Trust_** – Aplicação do princípio de mínima confiança, protegendo dados e processos sensíveis por meio de autenticação rigorosa, controle de acesso contínuo, criptografia e auditorias constantes, minimizando a superfície de ataque e prevenindo acessos indevidos.  

- **_Transparência e Auditabilidade_** – Registro detalhado de todas as ações para garantir rastreabilidade e conformidade, seguindo o princípio dos **5W1H** (Who, What, When, Where, Why e How).  

- **_Reversibilidade e Rastreabilidade_** – Todas as alterações são registradas de forma imutável e qualquer reversão gera um novo evento que anula a modificação anterior, preservando o histórico completo das operações.  

- **_Governança Contínua_** – Monitoramento proativo e revisão periódica de políticas, processos e sistemas para garantir conformidade contínua e adaptação a novas regulamentações.  

- **_Engajamento Interdisciplinar_** – Colaboração ativa entre governança, jurídico, engenharia e segurança desde a concepção dos produtos e processos.  

---

## **3. Normas, Padrões e Certificações**  

Abaixo estão as normas seguidas pela **Guardia**, explicando **o que** cada uma exige, **como** implementamos e **por que** ela é essencial para nossos clientes e operações.  

---

### **3.1 PCI DSS 4.0 (Payment Card Industry Data Security Standard)**  

**O que:**  
Define requisitos para garantir a segurança no processamento, armazenamento e transmissão de dados de cartões de pagamento.  

**Como implementamos:**  
- **Criptografia AES-256** para dados em repouso e **TLS 1.2+** para comunicação segura.  
- **Autenticação Multifator (MFA)** para acesso a sistemas sensíveis.  
- **Segmentação de redes**, isolando ambientes de pagamento de outros sistemas internos.  
- **SIEM para monitoramento contínuo**, detectando atividades suspeitas em tempo real.  

**Por que é importante:**  
Evita fraudes financeiras, vazamentos de dados e garante a integridade dos pagamentos eletrônicos.  

---

### **3.2 SOC 1 Type I e SOC 2 Type II**  

**O que:**  
Define padrões para a segurança operacional e a integridade dos controles internos sobre dados financeiros e de clientes.  

**Como implementamos:**  
- **Controle de acesso granular**, garantindo o princípio do menor privilégio.  
- **Monitoramento e logs centralizados**, com retenção mínima de 12 meses.  
- **Auditorias regulares** conduzidas por terceiros independentes.  
- **Testes periódicos de continuidade de negócios e recuperação de desastres**.  

**Por que é importante:**  
Assegura que nossos processos e sistemas financeiros sejam confiáveis e auditáveis, reforçando a credibilidade da plataforma.  

---

### **3.3 NIST CSF v2 (Cybersecurity Framework)**  

**O que:**  
Fornece um modelo de referência para identificar, proteger, detectar, responder e recuperar-se de ameaças cibernéticas.  

**Como implementamos:**  
- **Inventário de ativos e gestão de riscos**, garantindo visibilidade total sobre sistemas e dados.  
- **Threat Intelligence e SIEM**, permitindo respostas rápidas a incidentes.  
- **Treinamento contínuo** para conscientização de segurança cibernética.  
- **Plano de resposta a incidentes e recuperação de desastres**, minimizando impacto operacional.  

**Por que é importante:**  
Reduz riscos cibernéticos e assegura que a Guardia esteja preparada para responder a ataques rapidamente.  

---

### **3.4 LGPD Compliance (Lei Geral de Proteção de Dados)**  

**O que:**  
Estabelece regras sobre coleta, armazenamento e processamento de dados pessoais, garantindo direitos aos titulares.  

**Como implementamos:**  
- **Coleta de dados minimizada**, garantindo que apenas informações essenciais sejam armazenadas.  
- **Gestão de consentimento** para assegurar que os usuários tenham controle sobre seus dados.  
- **Registro de operações de tratamento**, garantindo transparência e rastreabilidade.  
- **Nomeação de um DPO** para garantir conformidade e resposta eficiente a incidentes.  

**Por que é importante:**  
Evita penalidades regulatórias e reforça a confiança dos clientes na proteção de seus dados.  

---

### **3.5 FAPI (Financial-grade API Security Profile)**  

**O que:**  
Define padrões de segurança para APIs financeiras, garantindo autenticação forte e proteção de dados.  

**Como implementamos:**  
- **OAuth 2.0 + OpenID Connect**, com escopos específicos para cada acesso.  
- **Assinatura digital (JWS) e criptografia (JWE)** para garantir a integridade dos tokens.  
- **Rate limiting e detecção de ataques**, prevenindo abusos e acessos indevidos.  

**Por que é importante:**  
Protege APIs financeiras contra fraudes, vazamentos de dados e ataques automatizados.  

---

### **3.6 ISO 27001 (Gestão da Segurança da Informação)**  

**O que:**  
Estabelece um modelo para gerenciamento seguro da informação dentro da organização.  

**Como implementamos:**  
- **Sistema de Gestão de Segurança da Informação (SGSI)** estruturado com políticas claras.  
- **Gestão de riscos cibernéticos**, incluindo avaliações regulares de vulnerabilidades.  
- **Segregação de funções e controle de acesso**, evitando acessos indevidos a dados críticos.  

**Por que é importante:**  
Reduz vulnerabilidades, protege a organização contra ataques e melhora a resiliência operacional.  

---

### **3.7 ISO 27701 (Gestão da Privacidade da Informação)**  

**O que:**  
Extensão da ISO 27001, focada na privacidade e proteção de dados pessoais.  

**Como implementamos:**  
- **Gestão contínua dos riscos de privacidade**, assegurando proteção de dados desde a coleta.  
- **Resposta rápida a incidentes de privacidade**, minimizando impactos regulatórios.  
- **Transparência e governança**, garantindo que todos os dados sejam processados com base legal adequada.  

**Por que é importante:**  
Permite que a Guardia atenda às regulamentações globais de privacidade e ofereça um alto nível de proteção de dados.  

---

## **4. Security by Design**  

**Security by Design** é um princípio fundamental em todos os aspectos da **Guardia**, abrangendo **produto, aplicações, infraestrutura e governança organizacional**. Desde a concepção, cada funcionalidade é projetada com **segurança integrada**, garantindo que os mais altos padrões de proteção sejam aplicados de forma proativa, minimizando riscos, prevenindo ameaças e assegurando conformidade contínua com regulamentações e boas práticas do setor.

### **4.1 Produto**  

#### **4.1.1 Access Control (Controle de Acesso)**  

### **Authorization by Context**  

#### **O que:**  
O acesso aos **front-ends da Guardia** adota um modelo de **controle de acesso baseado no contexto do usuário**, combinando **RBAC (Role-Based Access Control)** e **ABAC (Attribute-Based Access Control)** para garantir que cada usuário tenha permissões adequadas de acordo com sua função e o contexto da solicitação. Esse modelo assegura que operações sensíveis sejam acessíveis apenas a usuários devidamente autorizados, considerando fatores como **função, dispositivo, localização e tipo de conexão**.  

Para os **acessos internos da Guardia**, todos os requisitos de segurança descritos aqui são **obrigatórios**, garantindo total controle sobre as permissões e autenticações. Para os **acessos de clientes**, os mesmos requisitos são **recomendados**, permitindo flexibilidade para que cada cliente implemente as melhores práticas de segurança conforme sua necessidade e nível de risco.  

---

#### **Como implementamos:**  

##### **Modelo de Permissões Híbrido (RBAC + ABAC)**  
- **RBAC:** Cada usuário recebe permissões com base em sua **função dentro da organização** (ex.: administrador, operador, auditor).  
- **ABAC:** Permissões são ajustadas dinamicamente de acordo com **atributos do contexto**, como:  
  - Localização geográfica do usuário.  
  - Dispositivo utilizado (desktop, mobile, tablet).  
  - Horário e dia da solicitação.  
  - Tipo de conexão (interna ou externa à rede corporativa).  

---

##### **Provisionamento e Gestão de Identidades via SCIM**  
- Utilização do **SCIM (System for Cross-domain Identity Management)** para:  
  - **Provisionamento automático de usuários**, garantindo que novos acessos sejam atribuídos corretamente.  
  - **Atualização de permissões em tempo real** quando um usuário muda de função.  
  - **Revogação automática de acessos** para ex-colaboradores ou usuários inativos, reduzindo riscos de credenciais órfãs.  

---

##### **Autenticação Federada via SAML**  
- Suporte a **SAML 2.0 (Security Assertion Markup Language)** para integração com **provedores de identidade (IdPs)** como:  
  - Okta, Azure AD, Auth0, Google Workspace e outros.  
  - Permite **Single Sign-On (SSO)**, reduzindo a necessidade de múltiplas credenciais e facilitando o gerenciamento de acessos.  
  - **Autorização e atributos sincronizados automaticamente** com as políticas RBAC e ABAC, garantindo acesso dinâmico baseado em contexto.  

---

##### **Políticas Centralizadas e Gerenciáveis**  
- Definição e aplicação de **políticas de controle de acesso em tempo real** para evitar acessos indevidos.  
- Atualização dinâmica de permissões com base em **eventos de segurança** (ex.: login suspeito pode revogar acessos temporariamente).  
- Implementação de **mecanismos de revisão periódica de permissões** para evitar a concessão de privilégios excessivos.  

---

##### **Autenticação Contextual e Escalonável**  
- **Autenticação Multifator (MFA) obrigatória para todos os acessos internos, independentemente da origem (rede interna ou externa).**  
- **Para clientes, o MFA é altamente recomendado,** podendo ser configurado conforme a política de segurança de cada organização.  
- Restrição de acessos com base em **dispositivos confiáveis**, reforçando a segurança em sessões críticas.  
- **Sessões adaptativas**, onde políticas de segurança podem reforçar autenticação conforme mudanças no comportamento do usuário.  

---

#### **Por que é importante?**  
A exigência de **MFA para todos os acessos internos** impede que credenciais comprometidas sejam exploradas isoladamente, reduzindo drasticamente o risco de ataques baseados em phishing e credenciais vazadas. Para os **acessos de clientes**, a recomendação do MFA e dos modelos de autenticação contextuais proporciona **flexibilidade e segurança**, permitindo que cada cliente escolha o nível de proteção adequado às suas necessidades.  

O uso de **SCIM automatiza a gestão de identidades**, evitando erros manuais e garantindo que acessos sejam concedidos e revogados de maneira eficiente, reduzindo o risco de contas inativas ou acessos indevidos. Já o **SAML possibilita a autenticação federada e integração com IdPs**, permitindo um login seguro e centralizado, melhorando a experiência do usuário e reduzindo a necessidade de senhas adicionais.  

A aplicação de **políticas centralizadas e revisões periódicas de permissões** assegura que acessos sejam continuamente monitorados e ajustados conforme necessário, mantendo a conformidade com normas regulatórias e fortalecendo a postura de segurança organizacional.

---

### **Authentication and Authorization by Scope**  

#### **O que:**  
O controle de autorização nas **APIs da Guardia** segue um modelo baseado em escopos, garantindo que cada cliente tenha acesso **apenas às features e operações estritamente necessárias**. O processo é dinâmico, permitindo que clientes sejam registrados automaticamente e emitam **tokens contextuais**, que contêm escopos específicos e expiram automaticamente dentro de um período predefinido, conforme as recomendações do **FAPI (Financial-grade API Security Profile)**.  

---

#### **Como implementamos:**  

##### **Registro Dinâmico de Clientes (DCR - Dynamic Client Registration)**  
- Cada cliente é **registrado automaticamente** com acesso restrito aos escopos e features previamente autorizados.  
- Aplicação do princípio de **privilégio mínimo**, evitando concessões excessivas de permissões.  

##### **Definição de Escopos e Features**  
- O acesso é concedido de forma granular, associando features e escopos específicos ao cliente.  
- Exemplo de escopos:  
  - `ledger:read` → Permite leitura de transações.  
  - `ledger:write` → Permite criação e alteração de transações.  
  - `book:read` → Acesso a dados de contas bancárias.  
  - `book:write` → Modificação de informações de conta.  

##### **Emissão de Tokens Contextuais**  
- Cada **token gerado está associado a um conjunto específico de escopos**, garantindo que ele só possa ser utilizado para as operações autorizadas.  
- Tokens possuem **expiração automática** conforme as diretrizes do **FAPI**, reduzindo riscos de credenciais comprometidas.  
- Tokens de longa duração **não são permitidos**, exigindo renovação periódica para manter acessos ativos.  
- A emissão de tokens é **limitada**, impedindo que um cliente gere um número excessivo de tokens simultâneos, garantindo segurança e conformidade. 
- Token Opacos são emitidos.

---

#### **Por que é importante?**  

A implementação de autorização baseada em escopos garante um modelo de segurança **granular e robusto**, onde cada cliente tem acesso **apenas ao que precisa**, reduzindo riscos de acessos indevidos e privilégios excessivos. Além disso, a aplicação de **tokens contextuais com expiração automática** segue as melhores práticas do **FAPI**, mitigando o risco de comprometimento de credenciais, garantindo que qualquer token exposto tenha uma validade limitada.  

Essa abordagem **minimiza impactos de possíveis vazamentos de credenciais, melhora a rastreabilidade e assegura conformidade com padrões rigorosos de segurança**, tornando o sistema mais confiável e resiliente.  

---

### **Authentication (Autenticação Segura)**  

#### **O que:**  
Implementação de mecanismos robustos de autenticação para garantir a identidade confiável dos usuários e serviços, protegendo acessos e prevenindo fraudes.  

#### **Como implementamos:**  
- **OAuth 2.0 + OpenID Connect** para autenticação segura e delegação de acessos.  
- Implementação de **JWT (JSON Web Tokens)** assinados digitalmente para assegurar a integridade das credenciais.  
- **Rotação periódica de chaves** e expiração automática de sessões para reduzir o impacto de credenciais comprometidas.  
- **Autenticação Segura via MTLS Client Auth (Mutual TLS Authentication)**  
  - O processo de autenticação utiliza **MTLS (Mutual TLS Authentication)**, garantindo que apenas clientes autenticados com **certificados válidos** possam acessar as APIs.  
  - Essa abordagem evita ataques como **spoofing**, **replay attacks** e uso indevido de credenciais roubadas.  

---

#### **Por que é importante?**  
Adoção de padrões como **OAuth 2.0 e OpenID Connect** garante uma autenticação **moderna, segura e interoperável**, reduzindo riscos de acessos não autorizados. O uso de **JWTs assinados** assegura a integridade dos tokens, enquanto a **rotação periódica de chaves** e expiração de sessões limitam os danos caso uma credencial seja comprometida.  

A inclusão do **MTLS Client Auth** fortalece ainda mais a segurança ao validar **tanto o cliente quanto o servidor**, garantindo que apenas clientes autenticados com certificados válidos possam interagir com a API. Essa abordagem previne ataques de **spoofing**, impede o uso de credenciais roubadas e reforça a confiabilidade do sistema.

### **Audit Logs (Registros de Auditoria)**  

#### **O que:**  
Registro detalhado de todas as ações administrativas e operações sensíveis dentro do sistema, garantindo **visibilidade, rastreabilidade e conformidade** com requisitos regulatórios e boas práticas de segurança.  

#### **Como implementamos:**  
- **Captura de eventos essenciais**, incluindo:  
  - Tentativas de login (sucesso e falha).  
  - Alterações de permissões e acessos privilegiados.  
  - Modificações em dados sensíveis e configurações de segurança.  

- **Armazenamento seguro e imutável**:  
  - Logs são armazenados em **sistemas protegidos contra alteração ou exclusão**, garantindo integridade e não repúdio.  
  - Retenção mínima de **180 dias**, podendo ser estendida conforme requisitos regulatórios e operacionais.  

- **Monitoramento e resposta a incidentes:**  
  - Integração com **SIEM (Security Information and Event Management)** para análise em tempo real e detecção de atividades suspeitas.  
  - Alertas automáticos para eventos anômalos, como acessos incomuns ou tentativas repetidas de login.  

- **Aplicação do Princípio 5W1H para Auditoria**:  
  Todos os eventos registrados seguem o modelo **5W1H**, garantindo informações detalhadas para rastreabilidade e conformidade:  
  - **Who (Quem):** Identificação do usuário responsável pela ação.  
  - **What (O que):** Descrição detalhada da alteração realizada.  
  - **When (Quando):** Registro exato de data e hora do evento.  
  - **Where (Onde):** Origem da ação (dispositivo, IP, geolocalização).  
  - **Why (Por que):** Justificativa associada à ação.  
  - **How (Como):** Método utilizado para executar a alteração (manual, API, script, interface, etc.).  

#### **Por que é importante?**  
A implementação de **registros de auditoria robustos** assegura **rastreabilidade, transparência e conformidade**, permitindo que todas as atividades críticas sejam documentadas e revisadas. O uso do **princípio 5W1H** garante que cada evento registrado tenha **informações suficientes para auditorias internas e investigações forenses**, reduzindo riscos e permitindo resposta rápida a incidentes. A integração com **SIEM** reforça a segurança ao monitorar e detectar atividades suspeitas em tempo real, fortalecendo a postura de segurança da organização.

---

##### **SAML, SCIM, and MFA Support**  
- **O que:**  
  Implementação de **Single Sign-On (SSO)** com **SAML**, provisionamento automatizado de usuários com **SCIM** e exigência de **Autenticação Multifator (MFA)** para acessos críticos.  

- **Como:**  
  - Suporte a provedores de identidade como **Okta, Azure AD, Auth0**.  
  - Uso de **FIDO2/WebAuthn** para MFA sem senhas.  
  - Provisionamento dinâmico via **SCIM 2.0**, garantindo sincronização segura de usuários.  

- **Por que:**  
  Reduz risco de credenciais comprometidas, facilita gestão de usuários e melhora experiência de login seguro.  

---

#### **4.1.2 Encryption and Authentication**  

##### **Strong Encryption (Criptografia Forte)**  
- **O que:**  
  Proteção de dados sensíveis com criptografia de alto nível em repouso e em trânsito.  

- **Como:**  
  - **AES-256** para criptografia de dados armazenados.  
  - **TLS 1.3** para comunicações seguras.  
  - Uso de **HSMs (Hardware Security Modules)** para gerenciamento de chaves criptográficas.  

- **Por que:**  
  Garante confidencialidade dos dados e impede acesso não autorizado mesmo em caso de vazamento.  

---

##### **Webhook Signature (Assinatura de Webhooks)**  
- **O que:**  
  Garantia de integridade e autenticidade das requisições enviadas e recebidas via webhook.  

- **Como:**  
  - Uso de **HMAC-SHA256** para assinatura das requisições.  
  - Validação do cabeçalho de assinatura antes do processamento.  
  - Expiração de requisições antigas para evitar ataques de replay.  

- **Por que:**  
  Protege contra ataques MITM (Man-in-the-Middle) e garante que apenas webhooks legítimos sejam processados.  

---

#### **4.1.3 Hashing & Tokenization**  

##### **Hashing (Hash Seguro de Dados Sensíveis)**  
- **O que:**  
  Utilização de hashing forte para armazenamento seguro de senhas e dados críticos.  

- **Como:**  
  - Uso de **bcrypt, Argon2 ou PBKDF2** com fator de iteração alto.  
  - Salting aleatório para cada hash gerado.  
  - Proibição de armazenamento de senhas em texto plano.  

- **Por que:**  
  Previne vazamentos de credenciais e ataques de força bruta.  

---

##### **Tokenization (Substituição de Dados Sensíveis por Tokens)**  
- **O que:**  
  Substituição de dados sensíveis por identificadores únicos sem significado externo.  

- **Como:**  
  - Implementação de **Vaults Seguros** para mapeamento reverso de tokens.  
  - Tokens gerados com **UUIDs ou chaves criptográficas**.  
  - Proibição de armazenar valores originais em sistemas de acesso público.  

- **Por que:**  
  Minimiza impacto de vazamentos e simplifica conformidade com regulamentos de privacidade.  

---

#### **4.1.4 Rate Limiting (Proteção contra abuso de requisições)**  
- **O que:**  
  Controle do número de requisições permitidas em APIs e serviços para evitar abusos e ataques DDoS.  

- **Como:**  
  - Implementação de **Rate Limiting (limitação de taxa)** baseada em **IP, usuário e aplicação**.  
  - Uso de **algoritmos como Token Bucket e Leaky Bucket** para controle de fluxo.  
  - Bloqueio temporário de IPs após tentativas excessivas de autenticação (proteção contra **Brute Force**).  

- **Por que:**  
  Garante disponibilidade do serviço e protege contra ataques automatizados.  

---

#### **4.1.5 Data Policy (Política de Dados)**  

##### **Data Segmentation (Segmentação de Dados)**  
- **O que:**  
  Garantia de que dados de clientes sejam armazenados de forma isolada para evitar acessos indevidos.  

- **Como:**  
  - Separação lógica entre dados de diferentes clientes.  
  - Aplicação de **chaves de criptografia distintas por tenant**.  
  - Uso de **access control lists (ACLs)** para restringir acessos entre domínios de dados.  

- **Por que:**  
  Impede acessos não autorizados entre diferentes usuários ou organizações.  

---

##### **Data Protection (Proteção de Dados)**  
- **O que:**  
  Aplicação de medidas técnicas para evitar vazamento e exposição de dados sensíveis.  

- **Como:**  
  - **Monitoramento contínuo** contra tentativas de extração de dados.  
  - Aplicação de **DLP (Data Loss Prevention)** para evitar acessos não autorizados.  
  - **Política de Privacidade by Design**, minimizando coleta e retenção desnecessária.  

- **Por que:**  
  Reduz riscos de vazamento de dados e garante conformidade regulatória.  

---

##### **Data Retention (Retenção de Dados)**  
- **O que:**  
  Definição de períodos claros para retenção e descarte seguro de dados.  

- **Como:**  
  - Implementação de **políticas de retenção automatizadas**.  
  - Exclusão definitiva de dados após o prazo regulamentar.  
  - Registro e auditoria de operações de exclusão.  

- **Por que:**  
  Evita armazenamento desnecessário e reduz riscos legais e operacionais.  

---

##### **Data Breach (Resposta a Incidentes de Vazamento de Dados)**  
- **O que:**  
  Definição de processos para resposta rápida e mitigação de incidentes de segurança.  

- **Como:**  
  - **Plano de resposta a incidentes**, incluindo comunicação com clientes e autoridades.  
  - **Monitoramento 24/7** para detecção proativa de vazamentos.  
  - Adoção de **disaster recovery plans (DRP)** para rápida contenção de impactos.  

- **Por que:**  
  Minimiza impactos de vazamentos e melhora a resiliência do sistema.  

---

Essa estrutura garante que **Security by Design** esteja presente desde a concepção dos produtos. 🚀


---

### **Application**  


---

### Infrastructure




#### Availability and Reliability

 - Three 9s (99.9%) uptime
 - Four 9s (99.99%) uptime
 - Five 9s (99.999%) uptime

#### Disaster Recovery

##### Guardia Platform

##### Guardia Modules

- Pilot Light
- Warm Standby
- Active Active

#### Continuous Backup

#### DDoS Protection

#### Infrastructure Scanning


---

### Organizational

#### Background Checks

#### Incident Response

#### Security Training

#### Security Monitoring

#### Security Testing

#### Security Incident Management

---


## **4. Conclusão**  

Esta política assegura que a **Guardia** implemente práticas de segurança alinhadas aos padrões internacionais, garantindo proteção de dados, conformidade regulatória e confiança dos clientes. A integração dessas normas no dia a dia operacional fortalece a postura de segurança da empresa, promovendo um ambiente seguro e resiliente para todos os stakeholders.