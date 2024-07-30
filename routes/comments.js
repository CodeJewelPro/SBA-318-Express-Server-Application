const express = require("express");
const router = express.Router();
const comments = require("../data/comments");

router.get("/", (req, res) => {
  res.json(comments);
});

router.post("/", (req, res) => {
  if (req.body.postId && req.body.text) {
    const newComment = {
      id: comments.length + 1,
      postId: req.body.postId,
      text: req.body.text,
    };
    comments.push(newComment);
    res.json(newComment);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

router.get("/:id", (req, res) => {
  const comment = comments.find((c) => c.id == req.params.id);
  if (comment) res.json(comment);
  else res.status(404).json({ error: "Comment not found" });
});

router.patch("/:id", (req, res) => {
  const comment = comments.find((c, i) => {
    if (c.id == req.params.id) {
      for (const key in req.body) {
        comments[i][key] = req.body[key];
      }
      return true;
    }
  });
  if (comment) res.json(comment);
  else res.status(404).json({ error: "Comment not found" });
});

router.delete("/:id", (req, res) => {
  const commentIndex = comments.findIndex((c) => c.id == req.params.id);
  if (commentIndex > -1) {
    comments.splice(commentIndex, 1);
    res.json({ success: "Comment deleted" });
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

module.exports = router;