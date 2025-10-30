[action-image]: https://github.com/cezaraugusto/brave-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/brave-location/actions
[npm-version-image]: https://img.shields.io/npm/v/brave-location.svg?color=f26d21
[npm-version-url]: https://www.npmjs.com/package/brave-location
[npm-downloads-image]: https://img.shields.io/npm/dm/brave-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/brave-location

> Approximates the current location of the Brave browser across platforms.

# brave-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

<img alt="Brave" align="right" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/browser_logos/svg/brave.svg" width="10.5%" />

* By default checks only `stable`. Optionally, can cascade to `beta` / `nightly`.
* Supports macOS / Windows / Linux
* Works both as an ES module or command-line tool

## Support table

This table lists the default locations where Brave is typically installed for each supported platform and channel. By default, only the Stable channel is checked. When fallback is enabled, the package checks these paths (in order) and returns the first one found.

<table>
  <thead>
    <tr>
      <th>Platform</th>
      <th>Channel</th>
      <th>Paths checked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/macos.png" /><br><strong>macOS</strong></td>
      <td align="center">Stable</td>
      <td>
        <ul>
          <li><code>/Applications/Brave Browser.app/Contents/MacOS/Brave Browser</code></li>
          <li><code>~/Applications/Brave Browser.app/Contents/MacOS/Brave Browser</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Beta</td>
      <td>
        <ul>
          <li><code>/Applications/Brave Browser Beta.app/Contents/MacOS/Brave Browser Beta</code></li>
          <li><code>~/Applications/Brave Browser Beta.app/Contents/MacOS/Brave Browser Beta</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Nightly</td>
      <td>
        <ul>
          <li><code>/Applications/Brave Browser Nightly.app/Contents/MacOS/Brave Browser Nightly</code></li>
          <li><code>~/Applications/Brave Browser Nightly.app/Contents/MacOS/Brave Browser Nightly</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="3" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/windows.png" /><br><strong>Windows</strong></td>
      <td align="center">Stable</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\BraveSoftware\Brave-Browser\Application\brave.exe</code></li>
          <li><code>%PROGRAMFILES%\BraveSoftware\Brave-Browser\Application\brave.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\BraveSoftware\Brave-Browser\Application\brave.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Beta</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\BraveSoftware\Brave-Browser-Beta\Application\brave.exe</code></li>
          <li><code>%PROGRAMFILES%\BraveSoftware\Brave-Browser-Beta\Application\brave.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\BraveSoftware\Brave-Browser-Beta\Application\brave.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Nightly</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\BraveSoftware\Brave-Browser-Nightly\Application\brave.exe</code></li>
          <li><code>%PROGRAMFILES%\BraveSoftware\Brave-Browser-Nightly\Application\brave.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\BraveSoftware\Brave-Browser-Nightly\Application\brave.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="3" align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/linux.png" /><br><strong>Linux/other</strong></td>
      <td align="center">Stable</td>
      <td>
        <ul>
          <li><code>brave-browser</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Beta</td>
      <td>
        <ul>
          <li><code>brave-browser-beta</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">Nightly</td>
      <td>
        <ul>
          <li><code>brave-browser-nightly</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
  </tbody>
  </table>

Returns the first existing path found (given the selected channels), or `null` if none are found.

## Usage

**Via Node.js (strict by default):**

```js

import braveLocation from "brave-location";

// Strict (Stable only)
console.log(braveLocation());
// => "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" or null

// Enable fallback (Stable / Beta / Nightly)
console.log(braveLocation(true));
// => first found among Stable/Beta/Nightly or null
```

**Via CLI:**

```bash
npx brave-location
# Strict (Stable only)

npx brave-location --fallback
# Enable cascade (Stable / Beta / Nightly)

### Behavior change

As of this version, the default behavior is strict (Stable only). To search Beta/Nightly as fallbacks, pass `true` to the Node API or use the `--fallback`/`-f` CLI flag.
```

## Related projects

- [chrome-location2](https://github.com/cezaraugusto/chrome-location2)
- [firefox-location](https://github.com/hughsk/firefox-location)
- [edge-location](https://github.com/cezaraugusto/edge-location)
- [vivaldi-location](https://github.com/jandrey/vivaldi-location)
- [opera-location](https://github.com/jandrey/opera-location)

## License

MIT (c) Cezar Augusto.
