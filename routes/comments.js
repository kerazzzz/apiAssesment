const router = require("express").Router();
const Comment = require("../models/Comment");

// Create Comment
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Comments for a Post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.username === req.body.username) {
      await comment.delete();
      res.status(200).json("Comment deleted.");
    } else {
      res.status(401).json("You can delete only your own comment.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
