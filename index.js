const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/db");

const routes = require("./routes");

const app = express();

app.use(express.json());

const origins = process.env.CORS_ORIGIN.split(",");

app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/", routes);

const force = false;

app.listen(8082, () => console.log("Server listening on port 8082"));

(async () => {
  try {
    await db.sync({ force });
    console.log("DB Synced");
  } catch (error) {
    console.error("DB Sync failed:", error);
  }
})();
