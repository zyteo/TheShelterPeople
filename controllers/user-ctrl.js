// =======================================
//              DATABASE
// =======================================
const User = require("../models/users");
const Comment = require("../models/comments");
// for hashing password
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
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    // default role is guest
    req.body.role = "Guest";
    const user = new User(req.body);
    await user.save();

    // somehow, if the new user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ success: false, error: err });
    }

    // success!
    res.status(201).json({
      success: true,
      id: user._id,
      message: "User created!",
    });
  } catch (err) {
    res.status(400).json({
      err,
      message: "User not created!",
    });
  }
};

// For deleting user
// When deleting user, all the corrresponding comments are deleted too
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // remove comments associated with the user
    Comment.remove({ user_id: { $in: user.username } }, (err, data) => {
      console.log(data);
    });
    // remove the user
    await user.remove();
    // if the user doesnt exist, throw error
    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules - CRUD
// Read has 2 (for the index page--> showing all users, and for the show page--> show particular user)
module.exports = {
  createUser,
  deleteUser,
};
