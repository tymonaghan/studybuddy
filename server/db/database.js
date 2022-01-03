const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/studybuddy",
  {
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
    logging: false,
  }
);

module.exports = db;
