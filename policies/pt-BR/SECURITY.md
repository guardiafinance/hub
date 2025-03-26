# Política de Segurança da Informação

## Introdução

Na **Guardia**, a segurança das informações de nossos clientes é prioridade absoluta. Por meio de um programa abrangente, buscamos garantir proteção contínua, conformidade regulatória e confiança, desde a concepção até a operação dos sistemas. Nossa abordagem baseia-se no modelo **Zero Trust** e nos princípios de **Compliance e Security by Design**, assegurando que nossos produtos e serviços sejam desenvolvidos com segurança integrada e em aderência às melhores práticas do setor.

Acesse nosso Trust Center: [https://trust.guardia.com.br](https://trust.guardia.com.br)

---

## Security by Design

**Security by Design** é um princípio transversal à plataforma da Guardia. Cada produto, processo e componente da infraestrutura é desenhado com segurança embutida desde o início. Essa postura preventiva e contínua visa reduzir riscos, antecipar ameaças e garantir alinhamento com normas como PCI DSS, ISO 27001, LGPD, SOC 2 e FAPI.

---

### 4.1 Produto

#### Controle de Acesso por Contexto (RBAC + ABAC)

A Guardia adota uma abordagem de controle de acesso baseada em contexto, combinando RBAC (Role-Based Access Control) com ABAC (Attribute-Based Access Control). As permissões são avaliadas de forma dinâmica, levando em conta variáveis como função do usuário, localização, dispositivo e tipo de conexão. Esse modelo permite uma aplicação mais inteligente do princípio do menor privilégio, ajustando-se ao risco associado a cada requisição.

A exigência de MFA para acessos internos e sua recomendação para clientes fortalecem a proteção contra uso indevido de credenciais. Recursos como SAML e SCIM viabilizam autenticação federada e provisionamento automatizado de usuários, reduzindo erros operacionais e melhorando a governança de identidades. Esta abordagem está alinhada aos requisitos da ISO 27001, SOC 2 Type II, PCI DSS 4.0 e LGPD.

**Entenda em mais detalhes em:** [Access Control Context Spec.](../specifications/access-control-context.md)

---

#### Autorização por Escopo nas APIs

As APIs da Guardia seguem um modelo de autorização granular baseado em escopos, garantindo que cada cliente tenha acesso apenas às operações necessárias ao seu contexto. Os tokens de acesso são emitidos dinamicamente com escopos específicos e prazo de expiração definido, o que impede seu uso prolongado ou indevido.

Esse modelo reduz significativamente o risco de escalonamento de privilégios, uso indevido de credenciais e vazamentos. Ele também está alinhado às exigências do FAPI, promovendo segurança e interoperabilidade em integrações com instituições financeiras. Além disso, reforça a conformidade com normas como ISO 27001 e PCI DSS 4.0.

**Entenda em mais detalhes em:** [API Scope Authorization Spec.](../specifications/api-scope-authorization.md)

---

#### Autenticação Segura

A Guardia emprega padrões modernos de autenticação baseados em OAuth 2.0, OpenID Connect e Mutual TLS (MTLS), com tokens assinados digitalmente e controle de sessão baseado em expiração automática e rotação de chaves.

Esses mecanismos garantem robustez contra ataques de spoofing, replay e sequestro de sessão, promovendo uma autenticação confiável e auditável. A conformidade com normas como FAPI, ISO 27001 e NIST CSF reforça a segurança das integrações com clientes e parceiros.

**Entenda em mais detalhes em:** [Secure Authentication Spec.](../specifications/secure-authentication.md)

---

#### Registros de Auditoria (Audit Logs)

Todas as ações críticas dentro da plataforma são registradas com granularidade e imutabilidade, utilizando o modelo 5W1H (quem, o que, quando, onde, por que e como). Os logs são integrados a soluções de SIEM para detecção de anomalias e monitoramento contínuo.

Essa rastreabilidade reforça a governança, apoia investigações forenses e permite auditorias internas e externas em conformidade com SOC 2 Type II, ISO 27001 e LGPD.

**Entenda em mais detalhes em:** [Audit Logs Spec.](../specifications/audit-logs.md)

---

#### SAML, SCIM e MFA

A autenticação federada via SAML, o provisionamento automatizado de usuários com SCIM 2.0 e o uso de autenticação multifator com FIDO2/WebAuthn são recursos essenciais para garantir uma experiência de login segura e com governança centralizada.

Essa combinação reduz a dependência de senhas, automatiza o ciclo de vida de identidades e atende diretamente às exigências da PCI DSS 4.0, ISO 27001 e SOC 2 Type II.

**Entenda em mais detalhes em:** [Identity Federation and MFA Spec.](../specifications/identity-federation-mfa.md)

---

#### Criptografia Forte

Todos os dados sensíveis são protegidos com criptografia robusta, utilizando AES-256 para dados em repouso, TLS 1.3 para dados em trânsito e HSMs para gerenciamento seguro de chaves.

Essa camada de proteção garante confidencialidade, integridade e conformidade com requisitos técnicos estabelecidos pelas normas PCI DSS 4.0 e ISO 27001.

**Entenda em mais detalhes em:** [Strong Encryption Spec.](../specifications/strong-encryption.md)

---

#### Assinatura de Webhooks

Todas as requisições enviadas e recebidas via webhook são assinadas com HMAC-SHA256 e validadas com base em cabeçalhos de segurança e janelas de expiração.

Esse controle garante integridade das mensagens e proteção contra ataques de replay e falsificação, em conformidade com FAPI e ISO 27001.

**Entenda em mais detalhes em:** [Webhooks Signature Spec.](../specifications/webhooks-sign.md)

---

#### Hashing Seguro

Senhas e dados sensíveis são armazenados com algoritmos de hashing modernos como bcrypt, Argon2 e PBKDF2, sempre com salting aleatório.

Essa prática reduz drasticamente o risco de exposição em caso de violação e está alinhada com as exigências de PCI DSS 4.0 e ISO 27001.

**Entenda em mais detalhes em:** [Secure Hashing Spec.](../specifications/secure-hashing.md)

---

#### Tokenização de Dados

Dados confidenciais podem ser substituídos por tokens opacos, não reversíveis, armazenados em vaults seguros.

Esse mecanismo limita a exposição de informações sensíveis e facilita o cumprimento das obrigações legais impostas pela LGPD e ISO 27701.

**Entenda em mais detalhes em:** [Data Tokenization Spec.](../specifications/data-tokenization.md)

---

#### Rate Limiting

Requisições a APIs e serviços são controladas por algoritmos de limitação de taxa (como Token Bucket e Leaky Bucket), com base em IP, identidade e aplicação.

Essa medida protege os sistemas contra abuso, DDoS e brute force, garantindo estabilidade e aderência às diretrizes do FAPI e ISO 27001.

**Entenda em mais detalhes em:** [Rate Limiting Spec.](../specifications/rate-limiting.md)

---

#### Política de Dados

Os dados de clientes são segmentados logicamente, com chaves de criptografia distintas por tenant e controles de acesso isolados. Políticas de retenção garantem que dados sejam descartados com segurança ao fim do seu ciclo de vida, e mecanismos de proteção previnem vazamentos e exposições indevidas.

Essas práticas atendem diretamente à LGPD, promovem privacidade by design e estão alinhadas à ISO 27701 e ISO 27001.

**Entenda em mais detalhes em:** [Data Policy Spec.](../specifications/data-policy.md)

---

#### Resposta a Incidentes de Vazamento de Dados

A Guardia mantém um plano robusto de resposta a incidentes, incluindo detecção proativa, resposta imediata, comunicação estruturada com stakeholders e planos de recuperação de desastres.

Essa abordagem reforça a resiliência organizacional e garante conformidade com normas como ISO 27001, LGPD e NIST CSF.

**Entenda em mais detalhes em:** [Data Breach Response Spec.](../specifications/data-breach-response.md)

## Conclusão

Esta política reforça o compromisso da **Guardia** com práticas modernas de segurança da informação, baseadas em padrões internacionais, princípios de confiança contínua e governança integrada. A adoção dessas diretrizes é fundamental para garantir proteção de dados, conformidade regulatória e uma plataforma resiliente, segura e confiável.
