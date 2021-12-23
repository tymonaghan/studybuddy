const Sequelize = require("sequelize");
const db = require("./database");

const Project = db.define("project", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { notEmpty: true },
  },
  status: {
    type: Sequelize.ENUM,
    values: ["active", "complete", "dormant"],
  },
});

module.exports = Project;
