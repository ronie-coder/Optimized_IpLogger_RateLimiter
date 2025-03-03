const fs = require("fs");
const path = require("path");

// Allow a custom path or default to the current directory
const iplogger_to_TXT = (userIp, url, logFilePath = path.join(process.cwd(), "iplogger.txt")) => {
  // Ensure the directory exists before writing to the file
  const dir = path.dirname(logFilePath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Append the IP and URL to the log file
  fs.appendFile(
    logFilePath,
    `${new Date().toISOString()} - ${userIp} - ${url}\n`,
    (err) => {
      if (err) throw err;
      console.log(`IP address logged: ${userIp}`);
    }
  );
};

module.exports = iplogger_to_TXT;
