// lib/engine-handoff.ts
// CONTRACT: Single-Use, Ephemeral, Client-Side Persistence

const DB_NAME = 'SBU_LEGAL_EXECUTION';
const STORE_NAME = 'one_shot_session';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
  });
}

export async function setOneShotSession(
  file: File,
  token: string,
  draftType?: string
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    // We use a fixed key because we only support ONE active session at a time (Sovereignty)
    const request = store.put({
      key: 'active_session',
      file,
      token,
      draftType,
      timestamp: Date.now(),
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function consumeOneShotSession(): Promise<{
  file: File;
  token: string;
  draftType?: string;
} | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('active_session');

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result;
      if (result) {
        // CONSUME: Immediate incineration from storage upon read
        store.delete('active_session');
        resolve({ file: result.file, token: result.token, draftType: result.draftType });
      } else {
        resolve(null);
      }
    };
  });
}

export async function clearExecutionSession(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
