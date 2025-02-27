# **Compliance by Design**  

O **Compliance by Design** é um modelo que incorpora princípios de conformidade regulatória desde a concepção de sistemas, processos e produtos. Essa abordagem evita a necessidade de correções posteriores e garante aderência contínua às regulamentações.

Este documento estabelece as diretrizes de Compliance by Design que devem ser seguidas em todos da Guardia. A adoção dessas práticas não é opcional, sendo obrigatória para garantir a segurança, conformidade regulatória e governança contínua.

Cada sistema, processo ou produto desenvolvido deve estar em total alinhamento com as normas e padrões aqui definidos, incluindo, mas não se limitando aos princípios e diretrizes de Compliance by Design.

O não cumprimento dessas diretrizes pode resultar em revisões obrigatórias, bloqueios em processos de implantação e ações corretivas impostas pelo Comitê de Compliance da Guardia.

Para dúvidas ou solicitações relacionadas à aplicação dessas normas, consulte a equipe de Governança e Compliance ou acesse os documentos complementares disponíveis no repositório oficial da Guardia.


## **Princípios**  

- **_Automação da Conformidade_** – Implementação de controles e verificações automatizadas nos processos e sistemas, garantindo conformidade contínua e reduzindo riscos de não conformidade de forma eficiente e escalável.  

- **_Zero Trust_** – Aplicação do princípio de mínima confiança, protegendo dados e processos sensíveis por meio de autenticação rigorosa, controle de acesso contínuo, criptografia e auditorias constantes, minimizando a superfície de ataque e prevenindo acessos indevidos.  

- **_Transparência e Auditabilidade_** – Registro detalhado de todas as ações para garantir rastreabilidade e conformidade, seguindo o princípio dos **5W1H** (Who, What, When, Where, Why e How).  

- **_Reversibilidade e Rastreabilidade_** – Todas as alterações são registradas de forma imutável e qualquer reversão gera um novo evento que anula a modificação anterior, preservando o histórico completo das operações.  

- **_Governança Contínua_** – Monitoramento proativo e revisão periódica de políticas, processos e sistemas para garantir conformidade contínua e adaptação a novas regulamentações.  

- **_Engajamento Interdisciplinar_** – Colaboração ativa entre governança, jurídico, engenharia e segurança desde a concepção dos produtos e processos.  

## **Normas, Padrões e Certificações**  

Abaixo estão as normas seguidas pela **Guardia**, explicando **o que** cada uma exige, **como** implementamos e **por que** ela é essencial para nossos clientes e operações.  

### **PCI DSS 4.0 (Payment Card Industry Data Security Standard)**  

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

### **SOC 1 Type I e SOC 2 Type II**  

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

### **NIST CSF v2 (Cybersecurity Framework)**  

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

### **LGPD Compliance (Lei Geral de Proteção de Dados)**  

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

### **FAPI (Financial-grade API Security Profile)**  

**O que:**  
Define padrões de segurança para APIs financeiras, garantindo autenticação forte e proteção de dados.  

**Como implementamos:**  
- **OAuth 2.0 + OpenID Connect**, com escopos específicos para cada acesso.  
- **Assinatura digital (JWS) e criptografia (JWE)** para garantir a integridade dos tokens.  
- **Rate limiting e detecção de ataques**, prevenindo abusos e acessos indevidos.  

**Por que é importante:**  
Protege APIs financeiras contra fraudes, vazamentos de dados e ataques automatizados.  

---

### **ISO 27001 (Gestão da Segurança da Informação)**  

**O que:**  
Estabelece um modelo para gerenciamento seguro da informação dentro da organização.  

**Como implementamos:**  
- **Sistema de Gestão de Segurança da Informação (SGSI)** estruturado com políticas claras.  
- **Gestão de riscos cibernéticos**, incluindo avaliações regulares de vulnerabilidades.  
- **Segregação de funções e controle de acesso**, evitando acessos indevidos a dados críticos.  

**Por que é importante:**  
Reduz vulnerabilidades, protege a organização contra ataques e melhora a resiliência operacional.  

---

### **ISO 27701 (Gestão da Privacidade da Informação)**  

**O que:**  
Extensão da ISO 27001, focada na privacidade e proteção de dados pessoais.  

**Como implementamos:**  
- **Gestão contínua dos riscos de privacidade**, assegurando proteção de dados desde a coleta.  
- **Resposta rápida a incidentes de privacidade**, minimizando impactos regulatórios.  
- **Transparência e governança**, garantindo que todos os dados sejam processados com base legal adequada.  

**Por que é importante:**  
Permite que a Guardia atenda às regulamentações globais de privacidade e ofereça um alto nível de proteção de dados.


## **Dúvidas, Sugestões e Reportar Problemas**  

Para dúvidas ou solicitações relacionadas à aplicação dessas normas, consulte a equipe de **Governança e Compliance** @guardia/governance ou acesse os documentos complementares disponíveis no repositório oficial da **Guardia**.
