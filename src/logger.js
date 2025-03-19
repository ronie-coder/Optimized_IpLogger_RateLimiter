const redis = require("redis");
const fs = require("fs");
const path = require("path");

const client = redis.createClient();
client.connect(); // Ensure Redis is connected

const logKey = "ip_logs";
const logFilePath = path.join(process.cwd(), "iplogger.txt");

// Log IP to Redis
const iplogger_to_TXT = async (userIp, url) => {
  try {
    const logEntry = `${new Date().toISOString()} - ${userIp} - ${url}`;
    await client.rPush(logKey, logEntry); // Push log to Redis list
    console.log(`IP logged: ${logEntry}`);
  } catch (error) {
    console.error("Redis Logging Error:", error);
  }
};

// Periodically flush logs from Redis to file
const flushLogsToFile = async () => {
  try {
    const logs = await client.lRange(logKey, 0, -1);
    if (logs.length > 0) {
      fs.appendFileSync(logFilePath, logs.join("\n") + "\n");
      await client.del(logKey); // Clear Redis logs after writing
    }
  } catch (error) {
    console.error("Error flushing logs:", error);
  }
};

// Flush logs every minute
setInterval(flushLogsToFile, 60 * 1000);

module.exports = iplogger_to_TXT;
