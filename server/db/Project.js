const Sequelize = require("sequelize");
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
  trashed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Project;

// hooks
// yeah this works! Anytime a project is created, an automatically-generated
// example source will be associated with it.
Project.afterCreate(async (project) => {
  // console.dir(project.id);
  const demoSource = await Source.create(
    {
      name: "Example Book Source",
      classification: "secondary",
      type: "book",
      authorLastName: "Tilly",
      authorFirstName: "Syliva",
      publicationDate: "3189-01-01",
      notes:
        "This source was created automatically as an example. Feel free to delete it.",
      projectId: project.id,
    },
    { include: [Project] }
  );
});
