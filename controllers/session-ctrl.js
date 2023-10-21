// =======================================
//              DATABASE
// =======================================
require("dotenv").config();
const pg = require("pg");
const pool = new pg.Pool();
// for comparing password
const bcrypt = require("bcryptjs");

// Create all Session operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// For authentication
const getSession = async (req, res) => {
  const sessionUser = await req.session.currentUser;
  try {
    if (sessionUser) {
      res
        .status(200)
        .json({ success: true, message: "Authenticated!", data: sessionUser });
    }
  } catch (err) {
    res.status(401).json({ success: false, error: err });
  }
};

// For creating new session
const createSession = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a valid user",
    });
  }

  try {
    const { rows: user } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username]
    );

    // somehow, if the user doesn't exist, return error
    if (user.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    // user exists. Check if passwords match.
    if (bcrypt.compareSync(req.body.password, user[0].password)) {
      console.log("session", req.session);
      req.session.currentUser = user[0];
      console.log("session user", req.session.currentUser);
      // success!
      res.status(201).json({
        success: true,
        role: user[0].role,
        username: user[0].username,
        userid: user[0].id,
        message: "Login success!",
      });
    } else {
      // wrong login information
      res.status(401).json({ success: false, error: err });
    }
  } catch (err) {
    res.status(400).json({
      err,
      message: "Login failed!",
    });
  }
};

// For deleting session
const deleteSession = async (req, res) => {
  try {
    await req.session.destroy();
    // success!
    res.status(201).json({
      success: true,
      message: "Logout success!",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules - CRUD
// Read has 2 (for the index page--> showing all sessions, and for the show page--> show particular session)
module.exports = {
  getSession,
  createSession,
  deleteSession,
};
