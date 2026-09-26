import { promises as fs } from "fs";
import path from "path";

/**
 * Lightweight file-backed JSON store.
 * Swap `db<T>()` for a Prisma/Drizzle repository later without touching callers —
 * everything goes through `collection()` which exposes the same narrow API.
 */

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), ".data");

export type WithMeta = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type Store = Record<string, unknown[]>;
let cache: Store | null = null;
let queue: Promise<void> = Promise.resolve();

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function loadAll(): Promise<Store> {
  if (cache) return cache;
  await ensureDir();
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, "db.json"), "utf8");
    cache = JSON.parse(raw) as Store;
  } catch {
    cache = {};
  }
  return cache!;
}

function persist(store: Store): Promise<void> {
  queue = queue.then(async () => {
    await ensureDir();
    const tmp = path.join(DATA_DIR, "db.json.tmp");
    const dest = path.join(DATA_DIR, "db.json");
    await fs.writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
    // Atomic rename can transiently fail on Windows when concurrent workers
    // hold the destination open — retry, then fall back to an in-place write.
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        await fs.rename(tmp, dest);
        return;
      } catch (err) {
        const code = (err as NodeJS.ErrnoException).code;
        if (code !== "EPERM" && code !== "EACCES") throw err;
        await new Promise((r) => setTimeout(r, 40 * (attempt + 1)));
      }
    }
    await fs.writeFile(dest, JSON.stringify(store, null, 2), "utf8");
    await fs.rm(tmp, { force: true });
  });
  return queue;
}

export function collection<T extends WithMeta>(name: string) {
  async function list(filter?: (item: T) => boolean): Promise<T[]> {
    const store = await loadAll();
    const items = (store[name] as T[]) ?? [];
    return filter ? items.filter(filter) : items;
  }

  async function find(predicate: (item: T) => boolean): Promise<T | undefined> {
    const items = await list();
    return items.find(predicate);
  }

  async function insert(data: Omit<T, keyof WithMeta>): Promise<T> {
    const store = await loadAll();
    const now = new Date().toISOString();
    const item = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    } as unknown as T;
    store[name] = [...((store[name] as T[]) ?? []), item];
    await persist(store);
    return item;
  }

  async function update(id: string, patch: Partial<T>): Promise<T | undefined> {
    const store = await loadAll();
    const items = ((store[name] as T[]) ?? []).map((item) =>
      item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item
    );
    store[name] = items;
    await persist(store);
    return items.find((item) => item.id === id);
  }

  async function remove(id: string): Promise<boolean> {
    const store = await loadAll();
    const before = ((store[name] as T[]) ?? []).length;
    store[name] = ((store[name] as T[]) ?? []).filter((item) => item.id !== id);
    await persist(store);
    return ((store[name] as T[]) ?? []).length < before;
  }

  return { list, find, insert, update, remove };
}
