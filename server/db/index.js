const db = require("./database");
const Project = require("./Project");
const User = require("./User");
const Source = require("./Source");

//define db associations here:
const UserHasManyProjects = User.hasMany(Project);
const ProjectBelongsToUser = Project.belongsTo(User);

const ProjectHasManySources = Project.hasMany(Source);
const SourceBelongsToProject = Source.belongsTo(Project);

const UserHasManySources = User.hasMany(Source);

// module.exports = { db, Project, User };
module.exports = {
  db,
  models: { Project, User, Source },
  ProjectHasManySources,
};
