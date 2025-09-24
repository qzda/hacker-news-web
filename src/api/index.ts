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

export async function fetchNewStories() {
  const { data } = await axios.get<number[]>("/newstories.json");
  return data;
}

export async function fetchBestStories() {
  const { data } = await axios.get<number[]>("/beststories.json");
  return data;
}

export async function fetchAskStories() {
  const { data } = await axios.get<number[]>("/askstories.json");
  return data;
}

export async function fetchShowStories() {
  const { data } = await axios.get<number[]>("/showstories.json");
  return data;
}

export async function fetchJobStories() {
  const { data } = await axios.get<number[]>("/jobstories.json");
  return data;
}
