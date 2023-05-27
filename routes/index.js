const express = require("express");
const app = express();

const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const searchRouter = require("./routes/search");

app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/search", searchRouter);

module.exports = app;
