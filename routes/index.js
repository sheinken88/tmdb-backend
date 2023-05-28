const express = require("express");
const app = express();

const usersRouter = require("./users");
const moviesRouter = require("./movies");
const searchRouter = require("./search");

app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/search", searchRouter);

module.exports = app;
