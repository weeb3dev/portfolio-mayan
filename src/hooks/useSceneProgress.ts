import { useSyncExternalStore } from "react";

let sceneProgress = 0;
const listeners = new Set<() => void>();

/** 0–1 over hero+spacer only; holds at 1 while reading the rest of the page */
export function setSceneProgress(value: number) {
  sceneProgress = Math.min(1, Math.max(0, value));
  listeners.forEach((l) => l());
}

export function getSceneProgress() {
  return sceneProgress;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSceneProgress() {
  return useSyncExternalStore(subscribe, getSceneProgress, () => 0);
}

/** Phase helpers keyed to plan windows */
export function scenePhases(t: number) {
  const day = 1 - smooth(t, 0.18, 0.32);
  const dusk = smooth(t, 0.22, 0.38) * (1 - smooth(t, 0.48, 0.58));
  const night = smooth(t, 0.42, 0.58);
  const cenote = smooth(t, 0.58, 0.78);
  return { day, dusk, night, cenote };
}

function smooth(t: number, a: number, b: number) {
  if (t <= a) return 0;
  if (t >= b) return 1;
  const x = (t - a) / (b - a);
  return x * x * (3 - 2 * x);
}
