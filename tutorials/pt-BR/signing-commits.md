# Assinando commits

## Porque assinar commits?

Assinar commits é uma prática recomendada para garantir a autenticidade e a integridade dos commits. Isso é especialmente importante em projetos de código aberto, onde qualquer pessoa pode contribuir com código.

#### Gerando uma chave GPG

Para gerar uma chave GPG, você pode utilizar o comando:

```
gpg --full-generate-key
```

Para listar as chaves GPG, você pode utilizar o comando:

```
gpg --list-keys
```

Para exportar a chave GPG, você pode utilizar o comando:

```
gpg --export --armor <chave-gpg>
```

Copie a chave GPG, começando com `-----BEGIN PGP PUBLIC KEY BLOCK-----` e terminando com `-----END PGP PUBLIC KEY BLOCK-----`.

Para mais detalhes sobre como gerar uma nova chave GPG, consulte [Gerar uma nova chave GPG](https://docs.github.com/pt/authentication/managing-commit-signature-verification/generating-a-new-gpg-key).

--- 

#### Configurando o Git para assinar commits automaticamente

> **DICA:** Se você tiver configurado anteriormente o Git para usar um formato de chave diferente ao assinar com o `--gpg-sign`, desmarque essa configuração para que o formato padrão de openpgp seja usado.


```
git config --global --unset gpg.format
```

Para listar as chaves GPG, você pode utilizar o comando:

```
gpg --list-secret-keys --keyid-format=long
```

Você pode configurar o git para assinar commits automaticamente com o comando:

```
git config --global user.signingkey <chave-gpg>
```

Opcionalmente, para configurar o Git a fim de assinar todos os commits e rótulos por padrão, insira o seguinte comando:

```
git config --global commit.gpgsign true
git config --global tag.gpgSign true
```

Consulte [configurando o Git para assinar commits automaticamente](https://docs.github.com/pt/authentication/managing-commit-signature-verification/signing-commits) para mais detalhes.

Associando a chave GPG ao seu email

```
gpg --list-secret-keys --keyid-format=long
```

Identifique a chave GPG que você deseja associar ao seu email.

```
gpg --edit-key <chave-gpg>
```

Adicione o email que você deseja associar à chave GPG.

```
gpg> adduid
```

Siga as solicitações para fornecer seu nome verdadeiro, endereço de e-mail e quaisquer comentários. Você pode modificar as entradas escolhendo N, C ou E. Para manter seu endereço de email privado, use seu endereço de email no-reply fornecido pelo GitHub. Para saber mais, confira [Configurar o endereço de e-mail do commit](https://docs.github.com/pt/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address).

```
Real Name: YOUR REAL NAME
Email address: your@email.com
Comment: [optional] YOUR COMMENT
Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit?
```

Salve as alterações.

```
gpg> save
```

Veja como [adicionar uma chave GPG ao seu GitHub](https://docs.github.com/pt/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).


## Assinando um commit

```
git commit -S -m "Descrição do commit"
```

## Assinando um commit antigo

### 1. Liste seus commits recentes

Use o seguinte comando para ver o histórico dos commits:

```
git log --oneline
```

Isso listará os commits com seus hashes. Localize o commit que deseja assinar.

### 2. Inicie um rebase interativo

Se o commit que deseja assinar está, por exemplo, 3 commits atrás, rode:

```
git rebase -i HEAD~3
```

Isso abrirá um editor com uma lista dos commits recentes.

### 3. Edite o commit

Encontre o commit que deseja assinar e altere `pick` para `edit`, assim:

```
edit abc1234 Mensagem do commit

pick def5678 Outro commit
pick ghi9101 Mais um commit
```

Salve e feche o editor.

### 4. Assine o commit

Agora, assine o commit com sua chave GPG:

```
git commit --amend --no-edit -S
```

Se precisar definir uma chave específica, use:

```
git commit --amend --no-edit -S -u SEU_ID_GPG
```

### 5. Continue o rebase

Depois de assinar o commit, continue o rebase com:

```
git rebase --continue

```

Se houver mais commits a serem editados, repita o processo.

### 6. Forçar o push (se necessário)

Se o commit já foi enviado para um repositório remoto, você precisará forçar a atualização:

```
git push --force-with-lease
```

> **DICA:** `--force-with-lease` é mais seguro do que `--force`, pois evita sobrescrever alterações de outros colaboradores.