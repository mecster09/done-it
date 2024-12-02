export function initializeDB(): IDBFactory | null {
  if (typeof window === 'undefined') return null;
  
  if (!window.indexedDB) {
    console.warn('Your browser doesn\'t support IndexedDB');
    return null;
  }
  
  return window.indexedDB;
}

export function isIndexedDBAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.indexedDB;
} 