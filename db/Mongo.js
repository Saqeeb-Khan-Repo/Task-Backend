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
