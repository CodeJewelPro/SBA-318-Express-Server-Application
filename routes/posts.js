const express = require("express");
const router = express.Router();
const posts = require("../data/posts");

router.get("/", (req, res) => {
  res.json(posts);
});

router.post("/", (req, res) => {
  if (req.body.userId && req.body.title && req.body.content) {
    const newPost = {
      id: posts.length + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };
    posts.push(newPost);
    res.json(newPost);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) res.json(post);
  else res.status(404).json({ error: "Post not found" });
});

router.patch("/:id", (req, res) => {
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });
  if (post) res.json(post);
  else res.status(404).json({ error: "Post not found" });
});

router.delete("/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id == req.params.id);
  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    res.json({ success: "Post deleted" });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

module.exports = router;