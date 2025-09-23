import { isDev } from "./dev";

export function devLog(...arg: unknown[]) {
  if (isDev) {
    console.log(...arg);
  }
}
