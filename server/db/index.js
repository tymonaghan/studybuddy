const db = require("./database");
const Project = require("./Project");
const User = require("./User");

//define db associations here:
User.hasMany(Project);
Project.belongsTo(User);

// module.exports = { db, Project, User };
module.exports = { db, models: { Project, User } };
