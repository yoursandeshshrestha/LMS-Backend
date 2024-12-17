const Redis = require("ioredis");

// Create a Redis client
const redis = new Redis({
  host: "193.203.163.76", // Replace with your Redis server host
  port: 8000, // Replace with your Redis server port
  retryStrategy: (times) => {
    // Reconnect after
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Event listener for successful connection
redis.on("connect", () => {
  console.log("Redis connected");
});

// Event listener for errors
redis.on("error", (err) => {
  console.error("Redis error:", err);
});

// Event listener for connection end
redis.on("end", () => {
  console.log("Redis connection closed");
});

// Event listener for reconnection attempts
redis.on("reconnecting", (time) => {
  console.log(`Reconnecting to Redis in ${time} ms`);
});

module.exports = redis;
