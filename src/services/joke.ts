import data from "../../data.json";
import type { Joke } from "../../lib/types";

const getJokes = () => {
  return data as Joke[];
};

const getRandomJoke = (category: string | null) => {
  const jokes = getJokes();
  const filteredJokes = category
    ? jokes.filter((joke) => joke.category === category)
    : jokes;
  return filteredJokes[Math.floor(Math.random() * filteredJokes.length)];
};

export const jokeService = {
  getJokes,
  getRandomJoke,
};
