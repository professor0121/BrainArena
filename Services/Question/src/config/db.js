import mongoose from 'mongoose';

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
};
export default connectDB;