[action-image]: https://github.com/cezaraugusto/brave-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/brave-location/actions
[npm-version-image]: https://img.shields.io/npm/v/brave-location.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/brave-location
[npm-downloads-image]: https://img.shields.io/npm/dm/brave-location.svg?color=0971fe
[npm-downloads-url]: https://www.npmjs.com/package/brave-location

[![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

# brave-location

> Approximates the current location of the Brave browser across platforms.

# Resolution order

This module attempts to find Brave in the following channel order: stable/beta/nightly.

- macOS: checks `/Applications` and `~/Applications` for `Brave Browser(.app)`, `Brave Browser Beta(.app)`, `Brave Browser Nightly(.app)` in that order.
- Windows: checks `LOCALAPPDATA`, `PROGRAMFILES`, `PROGRAMFILES(X86)` for `BraveSoftware/Brave-Browser`, then `Brave-Browser-Beta`, then `Brave-Browser-Nightly` (`Application/brave.exe`).
- Linux/other: resolves `brave-browser`, then `brave-browser-beta`, then `brave-browser-nightly` on `PATH`.

Returns the first existing path, or `null` if none are found.

# Usage

**Via Node.js:**

```js
// Returns the path to brave as a string.
const braveLocation = require('brave-location')

console.log(braveLocation())
// /Applications/Brave Browser.app/Contents/MacOS/Brave Browser
```

**Via CLI:**

```bash
> npx brave-location
# /Applications/Brave Browser.app/Contents/MacOS/Brave Browser
```

## Related projects

* [chrome-location](https://github.com/hughsk/chrome-location)
* [chrome-location2](https://github.com/cezaraugusto/chrome-location2) (like `chromium-location` with fallback support to Chromium)
* [firefox-location](https://github.com/hughsk/firefox-location)
* [edge-location](https://github.com/cezaraugusto/edge-location)
* [vivaldi-location](https://github.com/jandrey/vivaldi-location)
* [opera-location](https://github.com/jandrey/opera-location)

## License

MIT (c) Cezar Augusto.
