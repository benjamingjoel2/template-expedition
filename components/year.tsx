"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => {};
const buildYear = new Date().getFullYear();

/** The current year, kept fresh on the client so a cached page never shows a stale ©. */
export function Year() {
  return <>{useSyncExternalStore(noop, () => new Date().getFullYear(), () => buildYear)}</>;
}
