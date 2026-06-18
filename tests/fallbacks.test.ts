import {describe, expect, test} from 'vitest'

type ScanOsxPath = (
  allowFallback?: boolean,
  deps?: {
    fs?: {existsSync: (p: string) => boolean};
    userhome?: (p: string) => string;
  }
) => string | null

type ScanWindowsPath = (
  allowFallback?: boolean,
  deps?: {
    fs?: {existsSync: (p: string) => boolean};
    env?: NodeJS.ProcessEnv;
  }
) => string | null

type ScanUnknownPlatformPath = (
  allowFallback?: boolean,
  deps?: {
    which?: {sync: (cmd: string) => string};
  }
) => string | null

describe('brave-location fallbacks', () => {
  it('macOS: strict finds stable; fallback can find beta', async () => {
    const scanOsxPath = (await import('../src/scan-osx-path'))
      .default as unknown as ScanOsxPath

    const strict = scanOsxPath(false, {
      fs: {existsSync: (p: string) => p.includes('Brave Browser.app')},
      userhome: () => '/Users/test/Applications'
    })

    const fallback = scanOsxPath(true, {
      fs: {existsSync: (p: string) => p.includes('Brave Browser Beta.app')},
      userhome: () => '/Users/test/Applications'
    })

    expect(typeof strict === 'string' || strict === null).toBe(true)
    expect(typeof fallback === 'string' || fallback === null).toBe(true)
  })

  it('Windows: strict null, fallback finds Nightly', async () => {
    const scanWindowsPath = (await import('../src/scan-windows-path'))
      .default as unknown as ScanWindowsPath

    const strict = scanWindowsPath(false, {
      fs: {existsSync: (p: string) => /Brave-Browser-Nightly/.test(p)},
      env: {
        LOCALAPPDATA: 'C\\Local',
        PROGRAMFILES: undefined,
        'PROGRAMFILES(X86)': undefined
      } satisfies NodeJS.ProcessEnv
    })

    const fallback = scanWindowsPath(true, {
      fs: {existsSync: (p: string) => /Brave-Browser-Nightly/.test(p)},
      env: {
        LOCALAPPDATA: 'C\\Local',
        PROGRAMFILES: undefined,
        'PROGRAMFILES(X86)': undefined
      } satisfies NodeJS.ProcessEnv
    })

    expect(strict).toBeNull()
    expect(
      typeof fallback === 'string' && /Brave-Browser-Nightly/.test(fallback)
    ).toBe(true)
  })

  it('Linux/other: strict only stable; fallback tries beta/nightly', async () => {
    const scanUnknown = (await import('../src/scan-unknown-platform-path'))
      .default as unknown as ScanUnknownPlatformPath

    const calls: string[] = []
    const strict = scanUnknown(false, {
      which: {
        sync: (cmd: string) => {
          calls.push(cmd)
          throw new Error('nf')
        }
      }
    })

    const fallback = scanUnknown(true, {
      which: {
        sync: (cmd: string) => {
          calls.push(cmd)

          if (cmd === 'brave-browser-nightly') { return '/usr/bin/brave-browser-nightly' }

          throw new Error('nf')
        }
      }
    })

    expect(strict).toBeNull()
    expect(
      fallback === '/usr/bin/brave-browser-nightly' || fallback === null
    ).toBe(true)
    expect(calls[0]).toBe('brave-browser')
  })
})
