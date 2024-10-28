require("dotenv").config();
const mongoose = require("mongoose");

//destruct
console.log("MongoDB URI:", process.env.MONGODB_URI);
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

const connectToMongoDB = async () => {
  // 0 means disconnected
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

// const getConnectedClient = () => mongoose.connection; // This returns the Mongoose connection instance
module.exports = connectToMongoDB;
