const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/db");

const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", //if used in linux
    // origin: "http://127.0.0.1:5173", //if used in mac
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/", routes);

const force = false;

(async () => {
  try {
    await db.sync({ force });

    app.listen(8082, () => console.log("Server listening on port 8082"));
  } catch (error) {
    console.error(error);
  }
})();

module.exports = app;
