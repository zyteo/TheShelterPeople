// =======================================
//              DEPENDENCIES
// =======================================
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT ?? 3000;
const session = require("express-session");
const pg = require("pg");
const catRouter = require("./controllers/cat-router");
const commentRouter = require("./controllers/comment-router");
const userRouter = require("./controllers/user-router");
const sessionRouter = require("./controllers/session-router");
// =======================================
//              CONFIGURATION
// =======================================

const pool = new pg.Pool();
// =======================================
//              MIDDLEWARE
// =======================================
app.use(express.static(path.join(__dirname, "client", "build")));
// for session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true, 
    saveUninitialized: false, 
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", catRouter);
app.use("/api", commentRouter);
app.use("/api", userRouter);
app.use("/api", sessionRouter);
app.get("/", async (req, res) => {
  res.send("Hello");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
