const Sequelize = require("sequelize");
const db = require("./database");

const Source = db.define("source", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { notEmpty: true },
  },
  classification: {
    type: Sequelize.ENUM,
    values: ["primary", "secondary", "other"],
  },
  type: {
    type: Sequelize.ENUM,
    values: [
      "book",
      "website",
      "journal article",
      "documentary film or clip",
      "newspaper",
      "archival document",
    ],
  },
  authorLastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  authorFirstName: {
    type: Sequelize.STRING,
  },
  publicationDate: {
    type: Sequelize.DATEONLY,
  },
  pageNumber: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Source;
