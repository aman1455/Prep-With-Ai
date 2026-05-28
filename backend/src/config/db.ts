import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("MongoDB Connected ✅");
  } catch (error) {
    logger.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
