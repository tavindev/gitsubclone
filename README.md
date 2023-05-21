# Gitsubclone

Gitsubclone is a simple script to easily clone one or more subdirectories of a github repo without needing to clone the whole repository itself. 

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


