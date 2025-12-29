// /app/db/Mongo.js - MAX DEBUG
console.log("🔥 ALL ENV VARS:", Object.keys(process.env));
console.log("🔍 MONGO_URL:", process.env.MONGO_URL);
console.log(
  "🔍 MONGO vars:",
  Object.keys(process.env).filter((k) => k.includes("MONGO"))
);

require("dotenv").config(); // Fallback (won't work in Railway)

const mongoose = require("mongoose");

const MongoConnect = async () => {
  try {
    const uri = process.env.MONGO_URL;
    console.log(
      "🔗 Using URI:",
      uri ? uri.substring(0, 40) + "..." : "❌ NULL"
    );

    if (!uri) {
      throw new Error("🚨 MONGO_URL environment variable MISSING in Railway");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("💥 MongoDB FAILED:", error.message);
    console.error("💥 Full error:", error);
    process.exit(1);
  }
};

module.exports = MongoConnect;
