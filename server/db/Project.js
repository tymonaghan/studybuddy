const Sequelize = require("sequelize");
const db = require("./database");

const Project = db.define("project", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  summary: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM,
    values: ["active", "complete", "dormant"],
    defaultValue: "active",
  },
});

module.exports = Project;
