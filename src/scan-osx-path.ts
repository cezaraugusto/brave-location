import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

type FsLike = { existsSync: (path: string) => boolean };
type Deps = { fs?: FsLike; userhome?: (path: string) => string };

export default function scanOsxPath(allowFallback = false, deps?: Deps) {
  const f: FsLike = deps?.fs ?? fs;
  const uh =
    deps?.userhome ?? ((p: string) => path.join(os.homedir(), String(p)));

  const appsAll = [
    { app: 'Brave Browser.app', exec: 'Brave Browser' },
    { app: 'Brave Browser Beta.app', exec: 'Brave Browser Beta' },
    { app: 'Brave Browser Nightly.app', exec: 'Brave Browser Nightly' },
  ];
  const apps = allowFallback ? appsAll : [appsAll[0]];

  const systemBase = '/Applications';
  const userBase = uh('Applications');

  for (const { app, exec } of apps) {
    const systemPath = `${systemBase}/${app}/Contents/MacOS/${exec}`;
    if (f.existsSync(systemPath)) return systemPath;

    const userPath = `${userBase}/${app}/Contents/MacOS/${exec}`;
    if (f.existsSync(userPath)) return userPath;
  }

  return null;
}
