const Sequelize = require("sequelize");
const db = require("./database");
const Project = require("./Project");

const Claim = db.define("claim", {
  claimNumber: {
    type: Sequelize.INTEGER,
  },
  claimText: {
    type: Sequelize.STRING,
  },
});

module.exports = Claim;
