const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const url = process.env.DB_URL;
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
