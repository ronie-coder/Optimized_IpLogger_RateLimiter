const express = require("express");
const customRateLimiter = require("./rateLimiter");
const iplogger_to_TXT = require("./logger");

const app = express();

app.use(async (req, res, next) => {
  await customRateLimiter(req, res, next); // Apply Redis rate limiter
  await iplogger_to_TXT(req.ip, req.url); // Log IP to Redis
});

app.get("/", (req, res) => {
  res.send("Hello, Redis optimized API!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
