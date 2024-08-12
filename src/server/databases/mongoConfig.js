import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const database = async () => {
  try {
    await mongoose.connect(process.env.URL);
  } catch (err) {
    console.log(err);
  }
};

export default database;
