const db = require("./database");
const Project = require("./Project");
const User = require("./User");
const Source = require("./Source");

//define db associations here:
User.hasMany(Project);
Project.belongsTo(User);

Project.hasMany(Source);
Source.belongsTo(Project);

// module.exports = { db, Project, User };
module.exports = { db, models: { Project, User, Source } };
