const redis = require("redis");
const client = redis.createClient();
const windowMs = 10 * 1000; // 10 seconds
const maxRequests = 5; // Limit requests per IP

client.connect(); // Ensure Redis is connected

const customRateLimiter = async (req, res, next) => {
  try {
    const userIp = req.ip;

    // Check request count in Redis
    const requestCount = await client.get(userIp);

    if (requestCount && requestCount >= maxRequests) {
      return res.status(429).send("Too many requests");
    }

    // Increment request count with expiry time
    await client.multi()
      .incr(userIp) // Increment request count
      .expire(userIp, windowMs / 1000) // Set expiry in seconds
      .exec();

    next();
  } catch (error) {
    console.error("Redis Rate Limiter Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = customRateLimiter;
