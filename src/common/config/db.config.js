import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected succefully ! ${mongoose.connection.name} `);
    return db;
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDb;
