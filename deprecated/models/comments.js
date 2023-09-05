const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user_id: { type: String, required: true },
    cat_id: { type: String, required: true },
    text: {
      type: String,
      min: [3, "Comment cannot be too short"],
    },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
