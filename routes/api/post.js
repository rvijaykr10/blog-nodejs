const express = require("express");
const auth = require("../../middleware/auth");

const router = express.Router();

const Post = require("../../models/Post");

//GET ALL POSTS
router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

//GET SINGLE POST
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

//CREATE POST
router.post("/", auth, async (req, res) => {
  try {
    const newPost = new Post({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
    });

    const post = await newPost.save();
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

//UPDATE POST
router.put("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post) {
      const newPost = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
      };

      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: newPost },
        { new: true }
      );
      res.status(200).json({ success: true, post });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

//DELETE SINGLE POST
router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post) {
      post = await Post.findByIdAndRemove(req.params.id);

      res.status(200).json({ success: true, post });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

//DELETE POSTS
router.delete("/", auth, async (req, res) => {
  try {
    let post = await Post.find();
    if (post) {
      post = await Post.deleteMany();

      res.status(200).json({ success: true, post });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
