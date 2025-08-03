const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },

    username: {
      type: String,
      required: true,
    },
    categories: {
      type: [String], 
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
