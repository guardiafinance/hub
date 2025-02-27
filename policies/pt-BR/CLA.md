# O Acordo de Licença do Contribuidor (CLA)

A [Cloud Native Computing Foundation](https://www.cncf.io) (CNCF) define
o status legal do código contribuído em dois tipos diferentes de _Acordos de Licença do Contribuidor_
(CLAs), [contribuidores individuais](https://github.com/cncf/cla/blob/master/individual-cla.pdf) e [corporações](https://github.com/cncf/cla/blob/master/corporate-cla.pdf).

A Guardia só pode aceitar código-fonte original de signatários do CLA.

É importante ler e entender este acordo legal.

## Como assinar?

Após criar seu primeiro Pull Request, o bot linux-foundation-easycla responderá com informações sobre seu status do CLA junto com um link para assinar o CLA.

<img width="1065" alt="EasyCLA bot" src="https://user-images.githubusercontent.com/69111235/152226443-f6fe61ee-0e92-46c5-b6ea-c0deb718a585.png">

<br />

> **NOTA:** Se você está se inscrevendo como contribuidor corporativo, certifique-se de ter vinculado seu endereço de e-mail corporativo ao seu perfil do GitHub (não precisa ser seu endereço de e-mail principal no GitHub), caso contrário, pode haver problemas com o sistema CLA.

Para mais informações, consulte [Adicionando um endereço de e-mail à sua conta do GitHub](https://docs.github.com/pt/account-and-profile/setting-up-and-managing-your-github-user-account/managing-email-preferences/adding-an-email-address-to-your-github-account).

#### 2. Autorize o EasyCLA a ler algumas de suas informações do GitHub

<img width="554" alt="Autorização GitHub EasyCLA" src="https://user-images.githubusercontent.com/69111235/152228712-7d22f9d0-9f3c-4226-9ee0-bacba4b47725.png">

- Clique no link **Please click here to be authorized** para navegar até a página de Autorização do GitHub Linux Foundation: EasyCLA.
- Em seguida, clique em **Authorize LF-Engineering** para dar à Linux Foundation acesso somente leitura para listar os endereços de e-mail associados à sua conta do GitHub.

#### 3. Selecione entre os dois tipos de contribuidor

<img width="1407" alt="EasyCLA" src="https://user-images.githubusercontent.com/69111235/152224818-1246453a-b086-4a57-9d14-c10d62ad438f.png">

Após autorizar o EasyCLA, você será redirecionado para uma página para identificar qual tipo de contribuidor você é.
Selecione a opção mais apropriada:
  * Contribuidor Individual: Você está contribuindo como pessoa física, e não como parte de outra organização.
  * Contribuidor Corporativo: Você está contribuindo em nome de seu empregador ou outra organização.

#### 4. Assine o CLA

Depois de selecionar o tipo de contribuidor, prossiga para Assinar o CLA e siga as instruções para completar o processo de assinatura através do DocuSign.

Depois de preencher as informações, clique em "Finish" e você será redirecionado de volta ao seu Pull Request.

#### 5. Procure por um e-mail indicando o cadastro bem-sucedido.

> Olá,
> 
> Este é um e-mail de notificação do EasyCLA referente ao projeto Cloud Native Computing > Foundation (CNCF).
> 
> O CLA foi assinado. Você pode baixar o CLA assinado como PDF aqui.
> 
> Se precisar de ajuda ou tiver dúvidas sobre o EasyCLA, você pode ler a documentação ou entrar em contato conosco para suporte.
> 
> Obrigado,
> Equipe de Suporte EasyCLA

#### 6. Valide seu CLA

Depois de ser redirecionado de volta ao seu Pull Request no GitHub, responda com um comentário `/easycla` para atualizar o status do CLA do seu PR.

## Alterando sua Afiliação

Se você mudou de empregador e ainda contribui para o Kubernetes, sua afiliação
precisa ser atualizada. A Cloud Native Computing Foundation usa o [gitdm](https://github.com/cncf/gitdm)
para rastrear quem está contribuindo e de onde. Crie um pull request no repositório
[gitdm](https://github.com/cncf/gitdm) com uma alteração no arquivo de texto de afiliação do desenvolvedor correspondente.
Sua entrada deve ser semelhante a isto:

```
Jorge O. Castro*: jorge!heptio.com, jorge!ubuntu.com, jorge.castro!gmail.com
Heptio
Canonical até 2017-03-31
```

## Solução de Problemas

Se você encontrar problemas ao assinar o CLA e precisar de assistência adicional, registre um ticket clicando no link [por favor envie um ticket de solicitação de suporte](https://jira.linuxfoundation.org/plugins/servlet/theme/portal/4) na resposta do bot EasyCLA. Alguém da CNCF responderá ao seu ticket para ajudar.

Caso tenha problemas ao usar o Site de Suporte da LF, envie uma mensagem para o
endereço de e-mail de suporte alternativo <login-issues@jira.linuxfoundation.org>

## Configurando a verificação do CLA da CNCF

Se você é um proprietário de organização ou repositório do Kubernetes no GitHub e gostaria de configurar a verificação do CLA da Linux Foundation CNCF para seus repositórios, [leia a documentação sobre como configurar a verificação do CLA da CNCF](/github-management/setting-up-cla-check.md)

[Site de Suporte da Linux Foundation]: https://support.linuxfoundation.org/