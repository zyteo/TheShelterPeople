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
// for session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
  }),
  cors({
    origin: ["https://the-shelter-people.vercel.app", "http://localhost:3001"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", catRouter);
app.use("/api", commentRouter);
app.use("/api", userRouter);
app.use("/api", sessionRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the Express API
module.exports = app;
