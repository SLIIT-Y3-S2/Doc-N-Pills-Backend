const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DATABASE;

const connectDB = async () => {
  await mongoose.connect(DB, {
     useNewUrlParser: true 
  });
  console.log("Database Connected");
};

module.exports = connectDB;