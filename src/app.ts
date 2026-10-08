import express from "express";

/** Express application. It is created here and started in server.ts (so tests can import it). */
const app = express();

app.use(express.json({ limit: "10kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
