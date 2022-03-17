const db = require("./database");
const Project = require("./Project");
const User = require("./User");
const Source = require("./Source");
const Note = require("./Note");
const Claim = require("./Claim");

//define db associations here:
const UserHasManyProjects = User.hasMany(Project);
const ProjectBelongsToUser = Project.belongsTo(User);

const ProjectHasManySources = Project.hasMany(Source);
const SourceBelongsToProject = Source.belongsTo(Project);

const SourceHasManyNotes = Source.hasMany(Note);
const NotesBelongToSource = Note.belongsTo(Source);

const ClaimHasManyNotes = Claim.hasMany(Note);
const NoteBelongsToClaim = Note.belongsTo(Claim);

const ProjectHasManyClaims = Project.hasMany(Claim);
const ClaimBelongsToProject = Claim.belongsTo(Project);

// module.exports = { db, Project, User };
module.exports = {
  db,
  models: { Project, User, Source, Note, Claim },
};
