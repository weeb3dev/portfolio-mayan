import { useSyncExternalStore } from "react";

let progress = 0;
const listeners = new Set<() => void>();

export function setScrollProgress(value: number) {
  progress = Math.min(1, Math.max(0, value));
  listeners.forEach((l) => l());
}

export function getScrollProgress() {
  return progress;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useScrollProgress() {
  return useSyncExternalStore(subscribe, getScrollProgress, () => 0);
}
