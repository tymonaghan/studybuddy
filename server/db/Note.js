const Sequelize = require("sequelize");
const db = require("./database");

const Note = db.define("note", {
  headline: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  text: {
    type: Sequelize.TEXT,
  },
  pageNumber: {
    type: Sequelize.STRING,
    // just making this a string will allow input of things like ranges that wouldn't validate with a number type
  },
});

module.exports = Note;
