[action-image]: https://github.com/cezaraugusto/brave-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/brave-location/actions
[npm-version-image]: https://img.shields.io/npm/v/brave-location.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/brave-location
[npm-downloads-image]: https://img.shields.io/npm/dm/brave-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/brave-location

# brave-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

<img alt="Brave" align="right" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/browser_logos/svg/brave.svg" width="12%" />

> Approximates the current location of the Brave browser across platforms.

* Finds Brave in the following channel order: `stable` / `beta` / `nightly`.
* Supports macOS / Windows / Linux
* Works both as an ES module or command-line tool

## Support table

This table lists the default locations where Brave is typically installed for each supported platform and channel. The package checks these paths (in order) and returns the first one found. If Brave is installed elsewhere, it may not be detected.

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

Returns the first existing path found, or `null` if none are found.

## Usage

**Via Node.js:**

```js
// Returns the path to brave as a string.
import braveLocation from "brave-location";

console.log(braveLocation());
// /Applications/Brave Browser.app/Contents/MacOS/Brave Browser
```

**Via CLI:**

```bash
npx brave-location
# /Applications/Brave Browser.app/Contents/MacOS/Brave Browser
```

## Related projects

- [chrome-location2](https://github.com/cezaraugusto/chrome-location2)
- [firefox-location](https://github.com/hughsk/firefox-location)
- [edge-location](https://github.com/cezaraugusto/edge-location)
- [vivaldi-location](https://github.com/jandrey/vivaldi-location)
- [opera-location](https://github.com/jandrey/opera-location)

## License

MIT (c) Cezar Augusto.
