import data from "../data.json";
import type { Joke } from "./types";

export const getJokes = () => {
  return data satisfies Joke[];
};

export const getRandomJoke = () => {
  const jokes = getJokes();
  return jokes[Math.floor(Math.random() * jokes.length)];
};
