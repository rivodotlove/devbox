import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "devbox";
const DB_VERSION = 1;
const STORE_NAME = "tool-state";

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
}

export async function getToolState<T = unknown>(toolId: string): Promise<T | undefined> {
  const db = await getDb();
  return db.get(STORE_NAME, toolId) as Promise<T | undefined>;
}

export async function setToolState<T = unknown>(toolId: string, state: T): Promise<void> {
  const db = await getDb();
  await db.put(STORE_NAME, state, toolId);
}

export async function clearToolState(toolId: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE_NAME, toolId);
}
