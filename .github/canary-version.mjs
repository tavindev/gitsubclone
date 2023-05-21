import fs from 'fs';
import { exec } from 'child_process';

function bumpVersion(commitHash) {
  const pkgJsonPath = './package.json';
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  const oldVersion = pkg.version;
  const [major, minor, patch] = oldVersion.split('.').map(Number);
  const newVersion = `${major}.${minor}.${patch + 1}-canary.${commitHash}`;

  pkg.version = newVersion;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));
}

try {
  exec('git rev-parse --short HEAD', (err, stdout) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    const commitHash = stdout.trim();
    bumpVersion(commitHash);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
