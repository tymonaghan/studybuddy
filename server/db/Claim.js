const Sequelize = require("sequelize");
const db = require("./database");
const Project = require("./Project");

const Claim = db.define("claim", {
  claimText: {
    type: Sequelize.STRING,
  },
});

module.exports = Claim;
