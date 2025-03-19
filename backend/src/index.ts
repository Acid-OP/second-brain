import express from "express";
import { JWT_SECRET } from "./config";
import Jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { userMiddleware } from "./middelware";
import { random } from "./utils";
import cors from "cors";
import { storeCardEmbeddings } from "./embeddingService";
import { queryWithQA } from "./qaService";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,
}));

// Signup
app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    await UserModel.create({
      username: username,
      password: password,
    });
    res.json({
      message: "user signed up",
    });
  } catch (e) {
    res.status(409).json({ message: "User already exists" });
  }
});

// Signin
app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({ username, password });
  if (existingUser) {
    const token = Jwt.sign({ id: existingUser._id }, JWT_SECRET);
    res.json({ token });
    console.log("token", token);
  } else {
    res.status(403).json({ message: "Incorrect credentials" });
  }
});

// Query
app.post("/api/v1/query", userMiddleware, async (req, res) => {
  const { query } = req.body;
  const userId = req.userId;

  try {
    console.log("[DEBUG] Received query request:", { query, userId });
    // @ts-ignore
    const card = await queryWithQA(query, userId);
    console.log("[DEBUG] Sending response with card:", card || "No card found");
    res.json({ card });
  } catch (error) {
    console.error("[ERROR] Error processing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
  res.json(content);
});

// Add Content (NEW ROUTE)
app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { link, type, description, title } = req.body;
  const userId = req.userId;

  try {
    console.log("[DEBUG] Received content creation request:", { link, type, description, title, userId });
    const content = await ContentModel.create({
      link,
      type,
      description,
      title,
      userId,
      tags: [],
    });

    try {
      await storeCardEmbeddings({
        _id: content._id.toString(),
        title,
        description,
        type,
        link,
        userId,
      });
      console.log("[DEBUG] Content added and embeddings stored for card:", content._id.toString());
    } catch (embeddingError) {
      console.warn("[WARN] Embeddings failed but content saved:", embeddingError);
    }

    res.json({ message: "Content added", _id: content._id });
  } catch (e) {
    console.error("[ERROR] Error adding content:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Content
app.delete("/api/v1/content", userMiddleware, (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  ContentModel.findOne({ _id: id, userId })
    .then((content) => {
      if (!content) {
        return res.status(404).json({ error: "Content not found or you don’t have permission." });
      }
      ContentModel.findByIdAndDelete(id)
        .then(() => {
          res.status(200).json({ message: "Content deleted successfully." });
        })
        .catch((e) => {
          console.error("Error deleting content:", e);
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((e) => {
      console.error("Error finding content:", e);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Share Functionality
// @ts-ignore
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const { share } = req.body;
  const userId = req.userId;

  try {
    const existingLink = await LinkModel.findOne({ userId });

    if (share) {
      if (existingLink) {
        return res.status(200).json({
          link: `${process.env.FRONTEND_URL || "http://localhost:5173"}/brain/${existingLink.hash}`,
        });
      }
      const hash = random(10);
      await LinkModel.create({
        hash,
        userId,
      });
      res.status(200).json({
        link: `${process.env.FRONTEND_URL || "http://localhost:5173"}/brain/${hash}`,
      });
    } else {
      if (!existingLink) {
        return res.status(400).json({
          error: "Your content is already private",
        });
      }
      await LinkModel.deleteOne({ userId });
      res.status(200).json({
        message: "Your content is now private",
      });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// @ts-ignore
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  try {
    const link = await LinkModel.findOne({ hash });
    if (!link) {
      return res.status(404).json({
        error: "Share link doesn't exist or has expired",
      });
    }
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(200).json({
      username: user.username,
      contents: content,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});