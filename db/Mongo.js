console.log("🔍 MONGODB_URI:", process.env.MONGO_URI);
console.log(
  "🔍 All env vars:",
  Object.keys(process.env).filter((k) => k.includes("MONGO"))
);
const mongoose = require("mongoose");

require("dotenv").config();

const MongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb Connected Successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = MongoConnect;
