const Sequelize = require("sequelize");

const databaseUrl = process.env.DATABASE_URL || "postgres://studybuddy:studybuddy@localhost:5432/studybuddy";

// Determine if we need SSL (for Heroku and other production databases)
// Parse the URL to properly check the hostname
let isProduction = process.env.NODE_ENV === 'production';
try {
  const url = new URL(databaseUrl);
  // Check if hostname ends with amazonaws.com (matches RDS hosts)
  isProduction = isProduction || url.hostname.endsWith('.amazonaws.com');
} catch (err) {
  // If URL parsing fails, fall back to NODE_ENV check only
  console.warn('Warning: Unable to parse DATABASE_URL for SSL detection:', err.message);
}

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
