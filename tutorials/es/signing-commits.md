# Firmando commits

## ¿Por qué firmar commits?

Firmar commits es una práctica recomendada para garantizar la autenticidad e integridad de los commits. Esto es especialmente importante en proyectos de código abierto, donde cualquier persona puede contribuir con código.

#### Generando una clave GPG

Para generar una clave GPG, puedes utilizar el comando:

```
gpg --full-generate-key
```

Para listar las claves GPG, puedes utilizar el comando:

```
gpg --list-keys
```

Para exportar la clave GPG, puedes utilizar el comando:

```
gpg --export --armor <clave-gpg>
```

Copia la clave GPG, comenzando con `-----BEGIN PGP PUBLIC KEY BLOCK-----` y terminando con `-----END PGP PUBLIC KEY BLOCK-----`.

Para más detalles sobre cómo generar una nueva clave GPG, consulta [Generar una nueva clave GPG](https://docs.github.com/es/authentication/managing-commit-signature-verification/generating-a-new-gpg-key).

--- 

#### Configurando Git para firmar commits automáticamente

> CONSEJO: Si anteriormente configuraste Git para usar un formato de clave diferente al firmar con `--gpg-sign`, desmarca esa configuración para que se use el formato predeterminado de openpgp.

```
git config --global --unset gpg.format
```

Para listar las claves GPG, puedes utilizar el comando:

```
gpg --list-secret-keys --keyid-format=long
```

Puedes configurar git para firmar commits automáticamente con el comando:

```
git config --global user.signingkey <clave-gpg>
```

Opcionalmente, para configurar Git para firmar todos los commits y etiquetas por defecto, introduce el siguiente comando:

```
git config --global commit.gpgsign true
git config --global tag.gpgSign true
```

Consulta [configurando Git para firmar commits automáticamente](https://docs.github.com/es/authentication/managing-commit-signature-verification/signing-commits) para más detalles.

Asociando la clave GPG a tu correo electrónico

```
gpg --list-secret-keys --keyid-format=long
```

Identifica la clave GPG que deseas asociar a tu correo electrónico.

```
gpg --edit-key <clave-gpg>
```

Añade el correo electrónico que deseas asociar a la clave GPG.

```
gpg> adduid
```

Sigue las indicaciones para proporcionar tu nombre real, dirección de correo electrónico y cualquier comentario. Puedes modificar las entradas eligiendo N, C o E. Para mantener tu dirección de correo electrónico privada, usa tu dirección de correo electrónico no-reply proporcionada por GitHub. Para saber más, consulta [Configurar la dirección de correo electrónico del commit](https://docs.github.com/es/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address).

```
Real Name: TU NOMBRE REAL
Email address: tu@email.com
Comment: [opcional] TU COMENTARIO
Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit?
```

Guarda los cambios.

```
gpg> save
```

Mira cómo [añadir una clave GPG a tu GitHub](https://docs.github.com/es/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).

## Firmando un commit

```
git commit -S -m "Descripción del commit"
```

## Firmando un commit antiguo

### 1. Lista tus commits recientes

Usa el siguiente comando para ver el historial de los commits:

```
git log --oneline
```

Esto listará los commits con sus hashes. Localiza el commit que deseas firmar.

### 2. Inicia un rebase interactivo

Si el commit que deseas firmar está, por ejemplo, 3 commits atrás, ejecuta:

```
git rebase -i HEAD~3
```

Esto abrirá un editor con una lista de los commits recientes.

### 3. Edita el commit

Encuentra el commit que deseas firmar y cambia `pick` por `edit`, así:

```
edit abc1234 Mensaje del commit

pick def5678 Otro commit
pick ghi9101 Otro commit más
```

Guarda y cierra el editor.

### 4. Firma el commit

Ahora, firma el commit con tu clave GPG:

```
git commit --amend --no-edit -S
```

Si necesitas definir una clave específica, usa:

```
git commit --amend --no-edit -S -u TU_ID_GPG
```

### 5. Continúa el rebase

Después de firmar el commit, continúa el rebase con:

```
git rebase --continue
```

Si hay más commits que editar, repite el proceso.

### 6. Forzar el push (si es necesario)

Si el commit ya fue enviado a un repositorio remoto, necesitarás forzar la actualización:

```
git push --force-with-lease
```

> **CONSEJO:** `--force-with-lease` es más seguro que `--force`, ya que evita sobrescribir cambios de otros colaboradores.
