// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const router = express.Router();
// get the CRUD operations
const SessionCtrl = require("./session-ctrl");

// =======================================
//              GET ROUTES
// =======================================
// This is for new session for login authentication
router.get("/login", SessionCtrl.getSession);

// =======================================
//              POST ROUTES
// =======================================
// This is for creating new session (log in)
router.post("/login", SessionCtrl.createSession);

// =======================================
//              DELETE ROUTES
// =======================================
// delete session (log out)
router.delete("/login", SessionCtrl.deleteSession);

module.exports = router;