[action-image]: https://github.com/cezaraugusto/brave-location/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/brave-location/actions?query=workflow%3ACI
[npm-image]: https://img.shields.io/npm/v/brave-location.svg
[npm-url]: https://npmjs.org/package/brave-location

# brave-location [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

> Approximates the current location of the Brave browser across platforms.

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
