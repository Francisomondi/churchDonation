import Redis from "ioredis";

let redis = null;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 1,
  });

  redis.on("connect", () => {
    console.log("✅ Redis connected");
  });

  redis.on("error", (err) => {
    console.log("❌ Redis error:", err.message);
  });
} else {
  console.log("⚠️ Redis disabled (no REDIS_URL set)");
}

export default redis;