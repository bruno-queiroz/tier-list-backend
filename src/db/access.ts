import mongoose from "mongoose";

export const connectToDB = async () => {
  await mongoose.connect(process.env.DATA_BASE_URL!);
  console.log("connected to the database");
};
