const mongoose = require("mongoose");

// create a function to connnect to the database
const dbConnect = async () => {
  try {
    // connecting to the database
    await mongoose.connect("mongodb://127.0.0.1:27017/shop");
    console.log("Database connected succesfully!");
  } catch (error) {
    //   throw error for debugging
    console.log(error);
    process.exit(1);
  }
};
module.exports = {
  dbConnect,
};
