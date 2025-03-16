import express from "express";
import { JWT_SECRET } from "./config";
import Jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { userMiddleware } from "./middelware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


// Routes without heavy TypeScript
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

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({ username, password });
  if (existingUser) {
    const token = Jwt.sign({ id: existingUser._id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(403).json({ message: "Incorrect credentials" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const description = req.body.description;
  await ContentModel.create({
    link,
    type,
    description,
    title: req.body.title,
    userId: req.userId,
    tags: [],
  });
  res.json({ message: "Content added" });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
  res.json(content);
  // console.log("Received data:", req.body);

});

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
          link: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/brain/${existingLink.hash}`,
        });
      }
      const hash = random(10);
      await LinkModel.create({
        hash,
        userId,
      });
      res.status(200).json({
        link: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/brain/${hash}`,
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