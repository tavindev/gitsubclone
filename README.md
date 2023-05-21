# Gitsubclone

Gitsubclone is a simple script to easily clone one or more subdirectories of a github repo without needing to clone the whole repository itself. 

For example, running:

```bash
gitsubclone https://github.com/cirosantilli/test-git-partial-clone-big-small-no-bigtree small
```

will clone the `small` subdirectory of the `test-git-partial-clone-big-small-no-bigtree` repository to the current directory.

# Installation

```bash
npm install -g gitsubclone
```

# Usage

```bash
gitsubclone <options> [repo] [subdirectories...]
```

# Options

| Option | Alias | Description |
| --- | --- | --- |
| --help | -h | Show help |
| --remove-git | -r | Remove .git folder from cloned subdirectories |
| --base-path | -b | Base path to clone subdirectories from |
| --output-path | -o | Output path to clone subdirectories to |

