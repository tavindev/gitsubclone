import yargs from 'yargs';
import { execSync } from 'child_process';
import path from 'path';

const args = yargs(process.argv.slice(2))
  .scriptName('gitsubclone')
  .alias('h', 'help')
  .command(
    '$0 [repoUrl] [folders...]',
    'Clone a git repository and checkout only the specified folders',
    (yargs) => {
      return yargs
        .option('remove-git', {
          alias: 'r',
          type: 'boolean',
          description: 'Remove .git folder',
        })
        .option('output', {
          alias: 'o',
          type: 'string',
          description: 'Output folder',
        })
        .option('base-path', {
          alias: 'b',
          type: 'string',
          description: 'Base path to clone the folders from',
        })
        .positional('repoUrl', {
          type: 'string',
          description: 'The repository url',
          demandOption: true,
        })
        .positional('folders', {
          array: true,
          description: 'The folders to checkout',
          demandOption: true,
        });
    },
    (argv) => {
      const repoUrl = argv.repoUrl;
      const folders = argv.folders;

      const output = argv.output ?? repoUrl.split('/').pop()!;

      console.log(`Cloning ${repoUrl} to ${output}`);

      execSync(`git clone -n --depth=1 --filter=tree:0 ${repoUrl} ${output}`);
      execSync(`cd ${path.join(output, argv.basePath ?? '')}`);
      execSync(`git sparse-checkout set --no-cone ${folders.join(' ')}`);
      execSync(`git checkout`);
      if (argv.removeGit) execSync(`rm -rf ${path.join(output, '.git')}`);

      console.log(`Cloned ${repoUrl} to ${output}`);
    }
  )
  .help().argv;

// git clone -n --depth=1 --filter=tree:0 \
// https://github.com/cirosantilli/test-git-partial-clone-big-small-no-bigtree
// cd test-git-partial-clone-big-small-no-bigtree
// git sparse-checkout set --no-cone small
// git checkout
