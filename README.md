# git-split-diffs

GitHub style split (side by side) diffs with syntax highlighting in your terminal.

![Screenshot of dark theme](screenshots/dark.png?raw=true)

![Screenshot of github-light theme](screenshots/github-light.png?raw=true)

[Demo 1](https://asciinema.org/a/Bsk7CFtZkDZ4Ea89BwDcbD8LA) | [Demo 2](https://asciinema.org/a/7HrYqF2vjfrKXt28bv6BUAcym)

## Usage

This currently requires `node` version 14 or newer to run.

### Install globally

```sh
npm install -g git-split-diffs

git config --global core.pager "git-split-diffs --color | less -RFX"
```

### Install locally

```sh
npm install git-split-diffs

git config core.pager "npx git-split-diffs --color | less -RFX"