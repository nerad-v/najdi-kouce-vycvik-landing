/**
 * Workaround pro Node 25 rozbitý localStorage shim v Claude Preview / dev sandboxu.
 * Next.js dev overlay si myslí že běží v prohlížeči a padá kvůli chybějícímu localStorage.
 *
 * Production build (`npm run build && npm start`) tenhle problém nemá.
 * Pokud běžíš na Node 20 (per package.json engines), můžeš tenhle soubor smazat.
 */
export async function register() {
  if (typeof globalThis.localStorage === 'undefined') {
    const memoryStore = new Map<string, string>()
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (key: string) => memoryStore.get(key) ?? null,
        setItem: (key: string, value: string) => {
          memoryStore.set(key, String(value))
        },
        removeItem: (key: string) => {
          memoryStore.delete(key)
        },
        clear: () => memoryStore.clear(),
        get length() {
          return memoryStore.size
        },
        key: (index: number) => Array.from(memoryStore.keys())[index] ?? null,
      },
      writable: false,
      configurable: false,
    })
  }
}
