#!/usr/bin/env node
'use strict';

const api = require('./dist/index.cjs');
const locateBrave = api.default || api;
const getBraveVersion = api.getBraveVersion;
const getInstallGuidance = api.getInstallGuidance;

const argv = process.argv.slice(2);
const allowFallback = argv.includes('--fallback') || argv.includes('-f');
const printBrowserVersion =
  argv.includes('--brave-version') || argv.includes('--browser-version');
const allowExec = argv.includes('--allow-exec');

try {
  const bravePath =
    (typeof locateBrave === 'function' && locateBrave(allowFallback)) ||
    (typeof locateBrave === 'function' && locateBrave(true)) ||
    null;

  if (!bravePath) {
    const guidance =
      (typeof getInstallGuidance === 'function' && getInstallGuidance()) ||
      'Brave not found.';
    console.error(guidance);
    process.exit(1);
  }

  if (printBrowserVersion && typeof getBraveVersion === 'function') {
    const v = getBraveVersion(bravePath, { allowExec });
    if (!v) {
      console.log('');
      process.exit(2);
    }
    console.log(String(v));
    process.exit(0);
  }

  console.log(String(bravePath));
} catch (e) {
  console.error(String(e?.message ? e.message : e));
  process.exit(1);
}
