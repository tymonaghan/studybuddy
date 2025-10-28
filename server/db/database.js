const Sequelize = require("sequelize");

const databaseUrl = process.env.DATABASE_URL || "postgres://studybuddy:studybuddy@localhost:5432/studybuddy";

// Determine if we need SSL (for Heroku and other production databases)
const isProduction = process.env.NODE_ENV === 'production' || databaseUrl.includes('amazonaws.com');

const config = {
  logging: false,
};

// Only add SSL config for production databases
if (isProduction) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(databaseUrl, config);

module.exports = db;
