import data from "../data.json";
import type { Joke } from "../lib/types";

export const getJokes = () => {
  return data as Joke[];
};

export const getRandomJoke = () => {
  const jokes = getJokes();
  return jokes[Math.floor(Math.random() * jokes.length)];
};

const server = Bun.serve({
  routes: {
    "/api/status": Response.json({
      success: true,
      message: "OK",
    }),

    "/api/joke": () => {
      return Response.json({
        success: true,
        message: "Here's a joke for you!",
        data: {
          ...getRandomJoke(),
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
