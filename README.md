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
```

### Use manually

```sh
git diff | git-split-diffs --color | less -RFX
```

## Customization

### Line wrapping

By default, lines are wrapped to fit in the screen. If you prefer to truncate them, update the `wrap-lines` setting:

```
git config split-diffs.wrap-lines false
```

### Inline changes

By default, salient changes within lines are also highlighted:
![Screenshot of inline changes](screenshots/inline-changes.png?raw=true)

You can disable this with the `highlight-line-changes` setting:

```
git config split-diffs.highlight-line-changes false
```

### Enable scrolling in the terminal

```sh
git config --global core.pager "git-split-diffs --color | less -+LFX"
```

(note the difference from the main configuration with the added `+` to the `less` command)

### Syntax highlighting

Syntax highlighting is supported via [shiki](https://github.com/shikijs/shiki/), which uses the same grammars and themes as vscode. Each theme specifies a default syntax highlighting theme to use, which can be overridden by:

```
git config split-diffs.syntax-highlighting-theme <name>
```

The supported syntax highlighting themes are listed at https://github.com/shikijs/shiki/blob/v0.9.3/docs/themes.md

You can disable syntax highlighting by setting the name to empty:

```
git config split-diffs.syntax-highlighting-theme ''
```

### Narrow terminals

Split diffs can be hard to read on narrow terminals, so we revert to unified diffs if we cannot fit two lines of `min-line-width` on scree