const express = require("express");
const customRateLimiter = require("./rateLimiter");
const iplogger_to_TXT = require("./logger");

const middleware = (req, res, next) => {
  // Apply rate limiter
  customRateLimiter(req, res, next);

  // Log IP address and URL
  const userIp = req.ip === "::1" ? "127.0.0.1" : req.ip;
  iplogger_to_TXT(userIp, req.url);
};

module.exports = middleware;
