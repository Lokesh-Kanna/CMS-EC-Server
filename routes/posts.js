import express from "express";
import { getAllPosts, createPost } from "../helper.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.route("/home").get(async (req, res) => {
  const filter = req.query;
  const posts = await getAllPosts(filter);
  res.send(posts);
});

router.route("/profile/add-post").post(async (req, res) => {
  const data = req.body;
  const addData = await createPost(data);
  res.send(addData);
});

export const postRouter = router;
