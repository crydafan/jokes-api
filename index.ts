import { jokes } from "./data.json";

const server = Bun.serve({
  routes: {
    "/api/status": Response.json({
      success: true,
      message: "OK",
    }),

    "/api/joke": () => {
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      return Response.json({
        success: true,
        message: "Here's a joke for you!",
        data: {
          ...joke,
        },
      });
    },

    "/*": Response.json({ success: false, err: "Not found" }, { status: 404 }),
  },
});

console.log(`Server running at ${server.url}`);
