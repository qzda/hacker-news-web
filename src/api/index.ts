import axios from "axios";
import type { Item } from "../types";

export async function fetchItemById(id: string | number) {
  const { data } = await axios.get<Item>(`/item/${id}.json`);
  return data;
}

export async function fetchTopStories() {
  const { data } = await axios.get<number[]>("/topstories.json");
  return data;
}
