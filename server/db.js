const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

const env = process.env.NODE_ENV || 'database';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port, // Add port configuration
  dialect: 'postgres', // Assuming you're using PostgreSQL
  dialectOptions: {
    connectTimeout: 10000 // Adjust as needed
  },
  logging: console.log,
  dialectOptions: {
    charset: 'utf8',
    collate: 'C'
  },
  define: {
    charset: 'utf8',
    collate: 'C'
  }
});
// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize;
