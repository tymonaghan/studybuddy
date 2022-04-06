const Sequelize = require("sequelize");
const Claim = require("./Claim");
const db = require("./database");
const Source = require("./Source");

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
  theme: {
    type: Sequelize.STRING,
    defaultValue: "Frontiers in History: People, Places, Ideas",
  },
  topic: {
    type: Sequelize.STRING,
    defaultValue: "Default topic",
  },
  thesis: {
    type: Sequelize.STRING,
    defaultValue: "Default thesis",
  },
  trashed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  sourceCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  noteCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Project;

// hooks
// yeah this works! Anytime a project is created, an automatically-generated
// example source will be associated with it.
Project.afterCreate(async (project) => {
  // console.dir(project.id);
  const demoClaimsOne = await Claim.create(
    {
      claimNumber: 1,
      claimText:
        "Sublight travel restricted the possibilities for mankind to encounter new worlds and civilizations.",
      projectId: project.id,
    },
    { include: [Project] }
  );
  const demoClaimsTwo = await Claim.create(
    {
      claimNumber: 2,
      claimText:
        "The advent of Warp technology gained the attention of other species in the galaxy.",
      projectId: project.id,
    },
    { include: [Project] }
  );
  const demoSource = await Source.create(
    {
      name: "Example Book Source",
      classification: "secondary",
      type: "book",
      authorLastName: "Tilly",
      authorFirstName: "Sylvia",
      publicationDate: "3189-01-01",
      sourceNotes:
        "This source was created automatically as an example. Feel free to delete it.",
      projectId: project.id,
    },
    { include: [Project] }
  );
});
