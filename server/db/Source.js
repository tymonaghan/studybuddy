const Sequelize = require("sequelize");
const db = require("./database");
const Note = require("./Note");
const Claim = require("./Claim");

const Source = db.define("source", {
  name: {
    type: Sequelize.STRING,
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
  authorFullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.authorFirstName} ${this.authorLastName}`;
    },
    set(value) {
      throw new Error(
        "do not try to set the fullname; set first and last names directly"
      );
    },
  },
  publicationDate: {
    type: Sequelize.DATEONLY,
  },
  sourceNotes: {
    type: Sequelize.TEXT,
    defaultValue: "add your own notes here.",
  },
});

module.exports = Source;

Source.afterCreate(async (source) => {
  const demoNote = await Note.create(
    {
      headline: "example note",
      text: "add text notes here, for example quotes",
      pageNumber: "pg 23, 52-57",
      sourceId: source.id,
      claimId: 1,
    },
    { include: [Source, Claim] }
  );
});
