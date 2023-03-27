import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDB = async () => {
  await mongoose.connect(process.env.DATA_BASE_URL!);
  console.log("connected to the databse");
};
