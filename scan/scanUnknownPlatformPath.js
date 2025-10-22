const which = require('which');

module.exports = function scanUnknownPlatform () {
  const candidates = [
    'brave-browser',
    'brave-browser-beta',
    'brave-browser-nightly'
  ]

  for (const cmd of candidates) {
    try {
      const resolved = which.sync(cmd);
      if (resolved) return resolved;
    } catch (err) {}
  }

  return null
}
