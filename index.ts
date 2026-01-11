const server = Bun.serve({
  routes: {
    "/api/status": Response.json({
      success: true,
      message: "OK",
    }),

    "/api/joke": Response.json({
      success: true,
      message: "Here's a joke for you!",
      data: {
        setup: "Why did the scarecrow win an award?",
        punchline: "Because he was outstanding in his field!",
      },
    }),

    "/*": Response.json({ success: false, err: "Not found" }, { status: 404 }),
  },
});

console.log(`Server running at ${server.url}`);
