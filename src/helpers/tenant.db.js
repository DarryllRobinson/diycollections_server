const dbConfig = require('./tenant.config.js');
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

// Determine which config to use for which environment
let config;

switch (process.env.REACT_APP_STAGE) {
  case 'development':
    config = dbConfig.devConfig;
    break;
  case 'sit':
    config = dbConfig.sitConfig;
    break;
  case 'uat':
    config = dbConfig.uatConfig;
    break;
  case 'production':
    config = dbConfig.prodConfig;
    break;
  default:
    config = dbConfig.devConfig;
    break;
}

module.exports = { connect };

async function connect(user, password) {
  //console.log('connecting to tenant db');
  const { host, port, database } = config;
  const pool = await mysql.createPool({
    connectionLimit: 100,
    host,
    port,
    user,
    password,
  });

  pool.getConnection((err, connection) => {
    if (err) throw err;
    //console.log('!!!!!!!!!!!!!!!!! tenant db connected as id ', connection.threadId);
  });

  // connect to db
  //console.log('connect to tenant db: ', database);
  const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
  });
  return sequelize;
}
