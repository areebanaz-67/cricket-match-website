const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
  path:'././config.env'
});
const URL = process.env.URL;
// console.log(URL);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;