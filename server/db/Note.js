const Sequelize = require("sequelize");
const db = require("./database");

const Note = db.define("note", {
  headline: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { notEmpty: true },
  },
  text: {
    type: Sequelize.TEXT,
    values: ["active", "complete", "dormant"],
  },
});
