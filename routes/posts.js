const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

const Comment = require("../models/Comment"); // add this at top with other models


//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST (doesnot show comments)
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


//GET Post(Shows Comments)

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comments = await Comment.find({ postId: req.params.id }).select("username text -_id");
    res.status(200).json({ post, comments });
  } catch (err) {
    res.status(500).json(err);
  }
});



// //GET ALL POSTS
// router.get("/", async (req, res) => {
//   const username = req.query.user;
//   const catName = req.query.cat;
//   try {
//     let posts;
//     if (username) {
//       posts = await Post.find({ username });
//     } else if (catName) {
//       posts = await Post.find({
//         categories: {
//           $in: [catName],
//         },
//       });
//     } else {
//       posts = await Post.find();
//     }

//     // For each post, fetch associated comments
//     const postsWithComments = await Promise.all(
//       posts.map(async (post) => {
//         const comments = await Comment.find({ postId: post._id }).select("username text -_id");
//         return { post, comments };
//       })
//     );

//     res.status(200).json(postsWithComments);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//---------------------^ works fine


//GET ALL POSTS with pagination
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const page = parseInt(req.query.page) || 1; // default to page 1
  const limit = parseInt(req.query.limit) || 3; // default 3 posts per page
  const skip = (page - 1) * limit;

  try {
    let filter = {};
    if (username) {
      filter.username = username;
    } else if (catName) {
      filter.categories = { $in: [catName] };
    }

    const posts = await Post.find(filter).skip(skip).limit(limit);

    // For each post, fetch associated comments
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({ postId: post._id }).select("username text -_id");
        return { post, comments };
      })
    );

    // Optionally, send total count for frontend pagination
    const totalPosts = await Post.countDocuments(filter);

    res.status(200).json({
      total: totalPosts,
      page,
      limit,
      posts: postsWithComments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
