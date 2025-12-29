// /app/db/Mongo.js - FIXED
require("dotenv").config(); // ✅ FIRST LINE

console.log(
  "🔍 MONGO_URL:",
  process.env.MONGO_URL
    ? "✅ SET (" + process.env.MONGO_URL.substring(0, 30) + "...)"
    : "❌ UNDEFINED"
);
console.log(
  "🔍 All MONGO vars:",
  Object.keys(process.env).filter((k) => k.includes("MONGO"))
);

const mongoose = require("mongoose");

const MongoConnect = async () => {
  try {
    // ✅ Validate URI exists
    if (!process.env.MONGO_URL) {
      throw new Error("❌ MONGO_URL environment variable is missing");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // ✅ Stop container on failure
  }
};

module.exports = MongoConnect;
