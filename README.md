# IP Logger and Rate Limiter Middleware

A highly efficient and optimal middleware for Express.js that combines IP logging and rate limiting in one package. With this middleware, you can easily log user IPs and prevent abuse by enforcing a customizable rate limit for each endpoint.

Perfect for applications that require basic traffic control while keeping your setup lightweight and easy to use.

Features
🚀 Optimized for performance: Minimal memory usage and fast execution.
📊 IP logging: Logs each user’s IP address and the requested URL to a local .txt file.
⏱️ Custom rate limiting: Set the time window for request limits (e.g., 10 seconds or 30 seconds) to avoid overloading your server.
🔄 Automatic request cleanup: The middleware automatically removes expired IP records from memory, keeping things lean.
🔒 Simple and secure: Prevents DDoS-like behavior by limiting the number of requests a user can make within a set time window.

## Installation

Install the package using npm:

## Usage

Below is a simple example of how to configure the middleware

![Example Image](https://i.imgur.com/CIgQwtc.jpeg)



```bash
npm install ip-logger-rate-limiter
