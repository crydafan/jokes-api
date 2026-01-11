import { getRandomJoke } from "./jokes";

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
