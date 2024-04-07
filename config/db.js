const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected To DB`.bgCyan.white);
  } catch (error) {
    console.log(`error in Connection DB ${error}`.bgRed.white);
  }
};
module.exports = connectDB;
