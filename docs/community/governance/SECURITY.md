---
sidebar_position: 4
---

# Política de Segurança

## Visão Geral

Levamos a segurança deste projeto a sério e damos boas-vindas a divulgações responsáveis da comunidade. Este documento descreve nosso processo para relatar, avaliar e responder a vulnerabilidades de segurança.

## Relatando uma Vulnerabilidade

Se você acredita que encontrou uma vulnerabilidade de segurança neste projeto, recomendamos fortemente que você **relate-a de forma privada e responsável**.

Existem dois canais seguros para divulgação:

### 1. GitHub Security Advisories (Preferido)

Você pode **relatar uma vulnerabilidade privadamente diretamente através do GitHub** seguindo estes passos:

* Navegue até a página principal da organização no GitHub.
* Vá até o repositório **[.github](https://github.com/guardiafinance/.github)**.
* Clique na aba **[Security](https://github.com/guardiafinance/.github/security)**.
* Clique em **"Report a vulnerability"** sob **"Security advisories"**.
* Complete o formulário com os detalhes do problema.

Este processo garante que apenas os mantenedores vejam seu relatório, permitindo um fluxo de divulgação coordenado e rastreável.

Veja mais: [GitHub Private Reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)

### 2. Email

Alternativamente, você pode entrar em contato conosco via:

**security@guardia.finance**

Inclua o seguinte em seu email:

* Uma descrição clara da vulnerabilidade
* Passos para reproduzi-la
* Versões ou componentes afetados
* Impacto potencial
* Opcional: Sua chave PGP se preferir comunicação criptografada

Confirmaremos o recebimento em **5 dias úteis** e pretendemos fornecer uma correção ou mitigação em **90 dias**, dependendo da gravidade.

## Processo de Tratamento de Vulnerabilidades

Nosso processo para gerenciar vulnerabilidades está alinhado com as melhores práticas da indústria e inclui:

1. **Triagem e Confirmação** – Validamos o problema e avaliamos a gravidade usando CVSS ou equivalente.
2. **Planejamento de Remediação** – Priorizamos e desenvolvemos uma correção ou solução alternativa.
3. **Divulgação Coordenada** – Podemos solicitar um atraso na divulgação pública para proteger os usuários enquanto as atualizações são implantadas.
4. **Publicação de Aviso** – Um aviso público é emitido após a correção do problema, incluindo créditos ao relator se o consentimento for dado.

Se aplicável, também podemos registrar um ID CVE como parte do processo de divulgação pública.

## Versões Suportadas

Atualmente fornecemos atualizações de segurança para a versão mais recente. Versões mais antigas podem não receber correções, a menos que estejam sob suporte estendido.

Consulte a página de [Releases](https://github.com/guardiafinance/lke/releases) para ver as versões atualmente suportadas.

## Nosso Compromisso com o Desenvolvimento Seguro

Seguimos diretrizes de segurança da **Linux Foundation**, **OpenSSF** e da **Apache Foundation**, incluindo:

* Commits assinados e releases verificadas
* Revisões de código com foco em design seguro
* Pipelines de CI/CD com varredura automatizada de vulnerabilidades
* Princípios de privilégios mínimos em ambientes cloud ou runtime
* Monitoramento contínuo de dependências usando Dependabot e outras ferramentas de segurança

## Declaração de Divulgação Responsável

Agradecemos muito os esforços da comunidade para melhorar nossa postura de segurança. Por favor, evite a divulgação pública de qualquer vulnerabilidade antes que tenhamos a chance de triagem e resposta. Estamos comprometidos com uma colaboração transparente e respeitosa com pesquisadores de segurança.
