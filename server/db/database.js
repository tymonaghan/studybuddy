const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/studybuddy",
  {
    dialectOptions: {
      // this dialectOptions section is required for the heroku postgres add-on to connect
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

module.exports = db;
