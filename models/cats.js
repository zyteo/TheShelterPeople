const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comments.js");

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: [2, "Cat name minimum of 2 characters."],
    },
    description: { type: String, required: true },
    image: { type: String },
    gender: { type: String, required: true },
    cage: { type: String, required: true },
    adoptable: { type: String, required: true },
    comments: [Comment.schema],
  },
  { timestamps: true }
);

const Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;
