const which = require('which');

module.exports = function scanUnknownPlatform (allowFallback = false) {
  const candidatesAll = [
    'brave-browser',
    'brave-browser-beta',
    'brave-browser-nightly'
  ]

  const candidates = allowFallback ? candidatesAll : [candidatesAll[0]]

  for (const cmd of candidates) {
    try {
      const resolved = which.sync(cmd);
      if (resolved) return resolved;
    } catch (err) {}
  }

  return null
}
