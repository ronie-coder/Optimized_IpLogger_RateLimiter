const requestLog = [];

const customRateLimiter = (req, res, next) => {
  const userIp = req.ip;
  const currentTime = Date.now();
  const windowMs = 10 * 1000; // 10 seconds

  // Remove expired requests before checking to prevent memory leaks
  requestLog.forEach((entry, index) => {
    if (currentTime - entry.timeStamp >= windowMs) {
      requestLog.splice(index, 1);
    }
  });

  for (let i = 0; i < requestLog.length; i++) {
    if (requestLog[i].ip === userIp && requestLog[i].url === req.url) {
      if (currentTime - requestLog[i].timeStamp < windowMs) {
        return res.status(429).send("Too many requests");
      } else {
        // Remove the old entry and allow the new request
        requestLog.splice(i, 1);
        break;
      }
    }
  }

  // Add new request to log
  requestLog.push({ ip: userIp, timeStamp: currentTime, url: req.url });

  next();
};

module.exports = customRateLimiter;
