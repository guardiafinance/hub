---
sidebar_position: 0
---

# Signing Commits

## Why Sign Commits?

Signing commits is a recommended practice to ensure the authenticity and integrity of commits. This is especially important in open source projects, where anyone can contribute code.

#### Generating a GPG Key

To generate a GPG key, you can use the command:

```
gpg --full-generate-key
```

To list GPG keys, you can use the command:

```
gpg --list-keys
```

To export the GPG key, you can use the command:

```
gpg --export --armor <gpg-key>
```

Copy the GPG key

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
...
-----END PGP PUBLIC KEY BLOCK-----
```

For more details on how to generate a new GPG key, see [Generating a new GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key).

---

#### Configuring Git to Sign Commits Automatically

> **TIP:** If you have previously configured Git to use a different key format when signing with `--gpg-sign`, unset this configuration so that the default openpgp format is used.

```
git config --global --unset gpg.format
```

To list GPG keys, you can use the command:

```
gpg --list-secret-keys --keyid-format=long
```

You can configure git to sign commits automatically with the command:

```
git config --global user.signingkey <gpg-key>
```

Optionally, to configure Git to sign all commits and tags by default, enter the following command:

```
git config --global commit.gpgsign true
git config --global tag.gpgSign true
```

See [configuring Git to sign commits automatically](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) for more details.

Associating the GPG key with your email

```
gpg --list-secret-keys --keyid-format=long
```

Identify the GPG key you want to associate with your email.

```
gpg --edit-key <gpg-key>
```

Add the email you want to associate with the GPG key.

```
gpg> adduid
```

Follow the prompts to provide your real name, email address, and any comments. You can modify the entries by choosing N, C, or E. To keep your email address private, use your GitHub-provided no-reply email address. For more information, see [Setting your commit email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address).

```
Real Name: YOUR REAL NAME
Email address: your@email.com
Comment: [optional] YOUR COMMENT
Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit?
```

Save the changes.

```
gpg> save
```

See how to [add a GPG key to your GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).


## Signing a New Commit

```
git commit -S -m "Commit description"
```

## Signing an Old Commit

### List Your Recent Commits

Use the following command to see the commit history:

```
git log --oneline
```

This will list the commits with their hashes. Locate the commit you want to sign.

### Start an Interactive Rebase

If the commit you want to sign is, for example, 3 commits back, run:

```
git rebase -i HEAD~3
```

This will open an editor with a list of recent commits.

### Edit the Commit

Find the commit you want to sign and change `pick` to `edit`, like this:

```
edit abc1234 Commit message

pick def5678 Another commit
pick ghi9101 One more commit
```

Save and close the editor.

### Sign the Commit

Now, sign the commit with your GPG key:

```
git commit --amend --no-edit -S
```

If you need to specify a particular key, use:

```
git commit --amend --no-edit -S -u YOUR_GPG_ID
```

### Continue the Rebase

After signing the commit, continue the rebase with:

```
git rebase --continue
```

If there are more commits to edit, repeat the process.

### Force Push (if needed)

If the commit has already been pushed to a remote repository, you'll need to force update:

```
git push --force-with-lease
```

> **TIP:** `--force-with-lease` is safer than `--force` as it prevents overwriting changes from other collaborators.