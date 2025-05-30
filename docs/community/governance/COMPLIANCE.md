---
sidebar_position: 2
---

# Compliance by Design

O **Compliance by Design** é um modelo que incorpora princípios de conformidade regulatória desde a concepção de sistemas, processos e produtos. Essa abordagem evita a necessidade de exaustivas correções posteriores e garante aderência contínua aos padrões e regulamentações que direcionam a evolução tecnológica do mercado financeiro global.

Este documento estabelece as diretrizes de Compliance by Design que devem ser seguidas em todos os projetos e operações da Guardia. A adoção dessas práticas não é opcional, sendo obrigatória para garantir a segurança, conformidade regulatória e governança contínua.

Cada sistema, processo ou produto desenvolvido deve estar em total alinhamento com as normas e padrões aqui definidos, incluindo, mas não se limitando aos princípios e diretrizes de Compliance by Design.

O não cumprimento dessas diretrizes pode resultar em revisões obrigatórias, bloqueios em processos de implantação e ações corretivas impostas pelo Comitê de Compliance da Guardia.

Para dúvidas ou solicitações relacionadas à aplicação dessas normas, consulte a equipe de Governança e Compliance ou acesse os documentos complementares disponíveis no repositório oficial da Guardia.

## Princípios

- **Automação da Conformidade** – Controles e verificações automatizadas são implementados desde os primeiros estágios de projeto, permitindo conformidade contínua com menor custo operacional e risco reduzido de falhas humanas.

- **Zero Trust** – Nenhum acesso é presumido como confiável. Cada requisição é validada de forma rigorosa, com autenticação multifator, políticas de acesso dinâmico, criptografia forte e registros auditáveis.

- **Transparência e Auditabilidade** – Toda ação relevante é registrada com granularidade, utilizando o modelo 5W1H (Who, What, When, Where, Why, How), permitindo rastreabilidade e prestação de contas efetiva.

- **Reversibilidade e Rastreabilidade** – Qualquer alteração de estado no sistema é registrada de forma imutável. Reversões geram novos eventos auditáveis, assegurando histórico completo de decisões e mudanças.

- **Eficiência** – A Guardia é uma empresa de tecnologia que utiliza a tecnologia para oferecer serviços de alta qualidade e eficiência, portanto, a adoção de práticas que asseguram a eficiência dos sistemas e processos se faz necessária para manter a competitividade e a qualidade dos serviços oferecidos.

- **Governança Contínua** – As políticas e controles passam por revisão e monitoramento periódicos. Isso garante alinhamento constante com novas regulamentações e evolução dos riscos.

- **Engajamento Interdisciplinar** – As áreas de Governança, Jurídico, Engenharia e Segurança trabalham de forma integrada desde a concepção de novos produtos, promovendo responsabilidade compartilhada pela conformidade.

## Normas, Padrões e Certificações

### PCI DSS 4.0

A Guardia é aderente à versão mais atual da norma PCI DSS (Payment Card Industry Data Security Standard), garantindo controles rigorosos para o processamento, armazenamento e transmissão de dados de cartão de pagamento. A segurança é assegurada por criptografia forte (AES-256, TLS 1.2+), autenticação multifator para ambientes sensíveis, segmentação de rede e monitoramento contínuo com uso de SIEM.

Essas medidas evitam fraudes financeiras, reforçam a integridade das operações e garantem conformidade com os principais requisitos do setor financeiro.

**Entenda em mais detalhes em:** [PCI DSS 4.0 Compliance Spec.](#)



### SOC 1 Type I e SOC 2 Type II

A conformidade com os padrões SOC assegura que os processos da Guardia sejam auditáveis, resilientes e confiáveis. Isso inclui controle de acesso granular, retenção e monitoramento de logs por no mínimo 12 meses, auditorias externas regulares e testes recorrentes de continuidade de negócios.

Essas práticas reforçam a confiança dos clientes e parceiros na integridade das operações financeiras e na governança da plataforma.

**Entenda em mais detalhes em:** [SOC Compliance Spec.](#)



### NIST CSF v2

O framework NIST CSF guia a estratégia da Guardia em cibersegurança. São mantidos inventários atualizados de ativos, processos de gestão de riscos, threat intelligence integrado ao SIEM e planos de resposta a incidentes.

Essa estrutura garante preparação frente a ameaças emergentes e fortalece a capacidade de resposta da organização diante de incidentes operacionais e de segurança.

**Entenda em mais detalhes em:** [NIST CSF Compliance Spec.](#)



### LGPD (Lei Geral de Proteção de Dados)

A Guardia adota políticas e controles aderentes à LGPD, priorizando privacidade desde a concepção. São aplicadas práticas de minimização de dados, gestão ativa de consentimento, registros de tratamento e a atuação de um DPO dedicado.

Essa conformidade mitiga riscos legais e reputacionais, promovendo transparência e fortalecendo a relação de confiança com os titulares de dados.

**Entenda em mais detalhes em:** [LGPD Compliance Spec.](#)



### FAPI (Financial-grade API Security Profile)

Para garantir segurança em APIs de alto risco, especialmente no contexto financeiro, a Guardia adota o padrão FAPI. Isso inclui autenticação robusta com OAuth 2.0 e OpenID Connect, tokens assinados e criptografados, rate limiting e mecanismos antifraude integrados.

Essa abordagem protege contra acesso indevido, fraude e vazamento de dados, alinhando a plataforma aos requisitos de instituições financeiras e reguladores.

**Entenda em mais detalhes em:** [FAPI Compliance Spec.](#)



### ISO 27001

O Sistema de Gestão de Segurança da Informação (SGSI) da Guardia é baseado na norma ISO 27001. Ele contempla políticas formalizadas, avaliações de risco recorrentes, segregação de funções e controles de acesso adaptativos.

A implementação dessa norma reduz a superfície de ataque, promove proteção contínua de ativos e assegura resiliência operacional mesmo em cenários adversos.

**Entenda em mais detalhes em:** [ISO 27001 Compliance Spec.](#)



### ISO 27701

Como extensão da ISO 27001, a ISO 27701 orienta a gestão de privacidade da informação. A Guardia aplica práticas de governança de dados pessoais, resposta rápida a incidentes de privacidade e registro transparente de base legal para tratamento de dados.

Esse padrão reforça o compromisso com a privacidade desde a concepção e facilita conformidade com legislações internacionais como LGPD e GDPR.

**Entenda em mais detalhes em:** [ISO 27701 Compliance Spec.](#)

---

## Reportar Bugs e Problemas

Para reportar vulnerabilidades de segurança, bugs ou problemas de conformidade, envie detalhes para [security@guardia.finance](mailto:security@guardia.finance) com informações detalhadas ou por meio de nossa comunidade no [WhatsApp](#)


Todas as comunicações são tratadas com confidencialidade e seguem nosso processo formal de resposta a incidentes, em conformidade com ISO 27001 e NIST CSF.


## Dúvidas e Sugestões

Para dúvidas ou solicitações relacionadas à aplicação dessas normas:

- Consulte a equipe de **Governança e Compliance** [@guardia/governance](https://github.com/orgs/guardiafinance/teams/governance) no WhatsApp.
- Envie um e-mail para [governance@guardia.finance](mailto:governance@guardia.finance)
- Abra uma discussão no [página de discussão](https://github.com/orgs/guardiafinance/discussions/new?category=bug-report) da **Guardia**

