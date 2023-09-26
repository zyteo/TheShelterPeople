// =======================================
//              DATABASE
// =======================================
require("dotenv").config();
const pg = require("pg");
const pool = new pg.Pool();

// Create all Comments CRUD operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// For making a new comment
const createComment = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a comment",
    });
  }

  try {
    // req.body exists, so make a new comment
    const { user_id, cat_id, username, comment } = req.body;
    // now add comment to cat
    const queryText = `
      INSERT INTO comments (user_id, cat_id, username, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [user_id, cat_id, username, comment];

    const { rows } = await pool.query(queryText, values);

    const addedComment = rows[0];
    // somehow, if the new comment doesn't exist, return error
    if (!addedComment) {
      return res.status(400).json({ success: false, error: "no comments" });
    }

    // success!
    res.status(201).json({
      success: true,
      id: addedComment.id,
      message: "Comment created!",
    });
  } catch (err) {
    res.status(400).json({
      err,
      message: "Comment not created!",
    });
  }
};

// For updating comment
const updateComment = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    // req.body exists, so find the comment by id and then update the comment text only
    const { rows: comment } = await pool.query(
      "SELECT * FROM comments WHERE id = $1",
      [req.params.id]
    );
    if (comment.length === 0) {
      return res.status(404).json({
        err,
        message: "Comment not found!",
      });
    }
    // if comment is not active, throw error
    if (comment[0].isactive === false) {
      return res.status(404).json({
        success: false,
        message: "Comment not found!",
      });
    }
    // update the comment details
    const queryText = `
    UPDATE comments
    SET comment = $1
    WHERE id = $2
    RETURNING *;
  `;

    const values = [req.body.comment, req.params.id];

    const { rows } = await pool.query(queryText, values);

    res.status(200).json({
      success: true,
      id: rows[0].id,
      message: "Comment updated!",
    });
  } catch (err) {
    res.status(404).json({
      err,
      message: "Comment not updated!",
    });
  }
};

// For deleting comment
const deleteComment = async (req, res) => {
  try {
    const { rows: comment } = await pool.query(
      "SELECT * FROM comments WHERE id = $1",
      [req.params.id]
    );
    // if the comment doesnt exist, throw error
    if (comment.length === 0) {
      return res.status(404).json({
        err,
        message: "Comment not found!",
      });
    }

    // remove the comment
    // const { rows } = await pool.query("DELETE FROM comments WHERE id = $1", [
    //   req.params.id,
    // ]);

    // set the comment isActive to false
    const { rows } = await pool.query(
      "UPDATE comments SET isactive = false WHERE id = $1",
      [req.params.id]
    );

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For showing a particular comment
const getCommentById = async (req, res) => {
  try {
    const { rows: comment } = await pool.query(
      "SELECT * FROM comments WHERE id = $1",
      [req.params.id]
    );
    // if the comment doesnt exist, throw error
    if (comment.length === 0) {
      return res.status(404).json({
        err,
        message: "Comment not found!",
      });
    }

    // check if the comment is active

    if (comment[0].isactive === true) {
      // return json response if successful
      res.status(200).json({ success: true, data: comment[0] });
    } else {
      return res.status(404).json({
        success: false,
        message: "Comment not found!",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// get all the comments associated with a particular cat id
// params.id refers to the cat id
const getCommentsByCatId = async (req, res) => {
  try {
    // only take the comments that are active
    const { rows: comments } = await pool.query(
      "SELECT * FROM comments WHERE cat_id = $1 AND isactive = true ORDER BY created_at ASC",
      [req.params.id]
    );

    // if there are no comments, inform user
    if (comments.length === 0) {
      return res.status(404).json({
        message: "Comments not found!",
      });
    }

    // return json response if successful
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules - CRUD
module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
  getCommentsByCatId,
};
