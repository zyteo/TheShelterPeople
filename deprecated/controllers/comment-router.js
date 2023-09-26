// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const router = express.Router();
// get the CRUD operations
const CommentCtrl = require("./comment-ctrl");

// =======================================
//              GET ROUTES
// =======================================
// This is for show page, showing particular comment
// :id is the comment's id
router.get("/comments/:id", CommentCtrl.getCommentById);

// =======================================
//              POST ROUTES
// =======================================
// This is for new comment for a particular cat
// :id is the cat's id
router.post("/cats/:id/newcomment", CommentCtrl.createComment);

// =======================================
//              PUT ROUTES
// =======================================
// This is for updating a comment
// :id is the comment's id
router.put("/comments/:id", CommentCtrl.updateComment);

// =======================================
//              DELETE ROUTES
// =======================================
// delete comment
// :id is the comment's id
router.delete("/comments/:id", CommentCtrl.deleteComment);

module.exports = router;
