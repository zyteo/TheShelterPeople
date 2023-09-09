// =======================================
//              DATABASE
// =======================================
require("dotenv").config();
const pg = require("pg");
const pool = new pg.Pool();
const bcrypt = require("bcrypt");

// Create all Users operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// For creating user
const createUser = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user",
    });
  }

  try {
    // first check if the username / email already exists
    // find the username
    const { rows: checkUsername } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username]
    );

    // find the email
    const { rows: checkEmail } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.email]
    );

    if (checkUsername.length > 0) {
      return res.status(409).json({
        message: "username exists",
      });
    } else if (checkEmail.length > 0) {
      return res.status(409).json({ message: "email exists" });
    }
    // All good - create user
    else if (checkUsername.length === 0 && checkEmail.length === 0) {
      //overwrite the user password with the hashed password, then pass that in to our database
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      );
      // default role is guest
      req.body.role = "Guest";

      const { username, email, password, role } = req.body;
      const queryText = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
      // create values for insertion to database
      const values = [username, email, password, role];
      const { rows } = await pool.query(queryText, values);

      const user = rows[0];

      // success!
      res.status(201).json({
        success: true,
        id: user.id,
        message: "User created!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      err,
      message: "User not created!",
    });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    // if the user doesnt exist, throw error
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// update user
const updateUser = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    // req.body exists, so find the user by id and then update
    const userId = req.params.id;
    // overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    const { username, email, password, role } = req.body;

    const queryText = `
      UPDATE users
      SET username = $1, email = $2, password = $3, role = $4
      WHERE id = $5
      RETURNING *;
    `;
    // create values for insertion to database
    const values = [username, email, password, role, userId];
    const { rows } = await pool.query(queryText, values);

    const user = rows[0];

    if (!user) {
      return res.status(404).json({
        error: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      id: user.id,
      message: "User updated!",
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      error,
      message: "User not updated!",
    });
  }
};

// For deleting user
// When deleting user, all the corrresponding comments are deleted too
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // remove comments associated with the user
    await pool.query("DELETE FROM comments WHERE user_id = $1", [userId]);
    // remove the user
    const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
      userId,
    ]);

    // if the user doesnt exist, throw error
    if (rowCount === 0) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    res.status(200).json({ success: true, message: "User deleted!" });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules
module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
