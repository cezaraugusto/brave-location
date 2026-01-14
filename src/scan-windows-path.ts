import * as fs from 'node:fs';
import * as path from 'node:path';

type FsLike = { existsSync: (path: string) => boolean };
type Deps = { fs?: FsLike; env?: NodeJS.ProcessEnv };

export default function scanWindowsPath(allowFallback = false, deps?: Deps) {
  const f: FsLike = deps?.fs ?? fs;
  const e = deps?.env ?? process.env;
  const prefixes = [
    e.LOCALAPPDATA,
    e.PROGRAMFILES,
    e['PROGRAMFILES(X86)'],
  ].filter(Boolean);

  const suffixesAll = [
    '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    '\\BraveSoftware\\Brave-Browser-Beta\\Application\\brave.exe',
    '\\BraveSoftware\\Brave-Browser-Nightly\\Application\\brave.exe',
  ];

  const suffixes = allowFallback ? suffixesAll : [suffixesAll[0]];

  for (const prefix of prefixes) {
    for (const suffix of suffixes) {
      const exe = path.join(prefix as string, suffix);
      if (f.existsSync(exe)) return exe;
    }
  }

  return null;
}
