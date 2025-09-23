import { devLog } from "./log";

export function shortUrl(url: string) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    devLog(error);
  }
}
