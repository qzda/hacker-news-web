import { devLog } from "./log";

export function shortUrl(url: string) {
  try {
    return new URL(url).hostname.split(".").slice(-2).join(".");
  } catch (error) {
    devLog(error);
  }
}
