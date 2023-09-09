// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const router = express.Router();
// get the CRUD operations
const UserCtrl = require("./user-ctrl");

// =======================================
//              POST ROUTES
// =======================================
// This is for new user
router.post("/users", UserCtrl.createUser);

// =======================================
//              GET ROUTES
// =======================================
router.get("/users/:id", UserCtrl.getUserById);

// =======================================
//              PUT ROUTES
// =======================================
router.put("/users/:id", UserCtrl.updateUser);

// =======================================
//              DELETE ROUTES
// =======================================
// delete user
// :id is the user's id
router.delete("/users/:id", UserCtrl.deleteUser);

module.exports = router;
