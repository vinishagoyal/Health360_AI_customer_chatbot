"use client";

import * as React from "react";

export function getLocalStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setLocalStorageItem<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = React.useState<T>(() =>
    getLocalStorageItem<T>(key, initialValue)
  );

  React.useEffect(() => {
    setLocalStorageItem(key, state);
  }, [key, state]);

  const reset = React.useCallback(() => {
    setState(initialValue);
  }, [initialValue]);

  return [state, setState, reset] as const;
}
