import { useState, useCallback } from 'react';

function getStoredData<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function setStoredData<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Generic localStorage-backed CRUD hook for arrays of items with `id` field.
 */
export function useLocalCrud<T extends { id: string }>(storageKey: string, defaults: T[]) {
  const [items, setItems] = useState<T[]>(() => getStoredData(storageKey, defaults));

  const persist = useCallback((updated: T[]) => {
    setItems(updated);
    setStoredData(storageKey, updated);
  }, [storageKey]);

  const add = useCallback((item: T) => {
    const updated = [...getStoredData(storageKey, defaults), item];
    persist(updated);
  }, [storageKey, defaults, persist]);

  const update = useCallback((id: string, changes: Partial<T>) => {
    const current = getStoredData<T[]>(storageKey, defaults);
    const updated = current.map((it) => (it.id === id ? { ...it, ...changes } : it));
    persist(updated);
  }, [storageKey, defaults, persist]);

  const remove = useCallback((id: string) => {
    const current = getStoredData<T[]>(storageKey, defaults);
    persist(current.filter((it) => it.id !== id));
  }, [storageKey, defaults, persist]);

  const refresh = useCallback(() => {
    setItems(getStoredData(storageKey, defaults));
  }, [storageKey, defaults]);

  return { data: items, isLoading: false, add, update, remove, refresh };
}

/**
 * localStorage-backed hook for a single object (profile, settings).
 */
export function useLocalObject<T extends { id: string }>(storageKey: string, fallback: T) {
  const [data, setData] = useState<T>(() => getStoredData(storageKey, fallback));

  const update = useCallback((changes: Partial<T>) => {
    const current = getStoredData(storageKey, fallback);
    const updated = { ...current, ...changes };
    setStoredData(storageKey, updated);
    setData(updated);
  }, [storageKey, fallback]);

  return { data, isLoading: false, update };
}
