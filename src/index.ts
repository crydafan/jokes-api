import { rateLimit } from "./middleware/rate-limiter";
import { jokeService } from "./services/joke";

const server = Bun.serve({
  async fetch(req, server) {
    const ip = server.requestIP(req)?.address ?? "unknown";
    const { limited } = await rateLimit(ip);

    if (limited) {
      return Response.json(
        {
          success: false,
          message: "Rate limit exceeded. Please try again later.",
        },
        { status: 429 }
      );
    }

    const url = new URL(req.url);
    if (url.pathname === "/api/status") {
      return Response.json({
        success: true,
        message: "OK",
      });
    }
    if (url.pathname === "/api/joke") {
      const category = url.searchParams.get("category");
      return Response.json({
        success: true,
        message: "Here's a joke for you!",
        data: {
          ...jokeService.getRandomJoke(category),
        },
      });
    }
    return Response.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );
  },
});

console.log(`Server running at ${server.url}`);
