import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit on failure
  }
}

// Call the connection function
connectToMongoDB();

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  description: String,
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
});

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);