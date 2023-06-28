const Sequelize = require("sequelize");
const config = require("./index");

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

module.exports = db;
