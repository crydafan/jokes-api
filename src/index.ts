import data from "../data.json";
import type { Joke } from "../lib/types";

export const getJokes = () => {
  return data as Joke[];
};

export const getRandomJoke = (category: string | null) => {
  const jokes = getJokes();
  const filteredJokes = category
    ? jokes.filter((joke) => joke.category === category)
    : jokes;
  return filteredJokes[Math.floor(Math.random() * filteredJokes.length)];
};

const server = Bun.serve({
  routes: {
    "/api/status": Response.json({
      success: true,
      message: "OK",
    }),

    "/api/joke": (req) => {
      const url = new URL(req.url);
      const category = url.searchParams.get("category");
      return Response.json({
        success: true,
        message: "Here's a joke for you!",
        data: {
          ...getRandomJoke(category),
        },
      });
    },

    "/*": Response.json(
      { success: false, message: "Not found" },
      { status: 404 }
    ),
  },
});

console.log(`Server running at ${server.url}`);
