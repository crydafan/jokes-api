import { jokeService } from "./services/joke";

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
          ...jokeService.getRandomJoke(category),
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
