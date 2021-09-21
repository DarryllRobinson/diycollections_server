const dbConfig = require('./config.js');
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

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  console.log('REACT_APP_STAGE: ', process.env.REACT_APP_STAGE);
  //console.log('Creating db with config: ', config);
  const { host, port, user, password, database } = config;
  const pool = await mysql.createPool({
    connectionLimit: 100,
    host,
    port,
    user,
    password,
  });

  pool.getConnection((err, connection) => {
    if (err) throw err;
    //console.log('!!!!!!!!!!!!!!!!! db connected as id ', connection.threadId);

    connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\`;`,
      (err, result) => {
        connection.release();
        if (err) throw err;
      }
    );
  });

  // connect to db
  console.log('connect to db: ', database);
  const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
  });

  // init models and add them to the exported db object
  db.Client = require('../clients/client.model')(sequelize);

  db.User = require('../users/user.model')(sequelize);
  db.RefreshToken = require('../users/refresh-token.model')(sequelize);

  // define relationships
  // add relationships for clients, customers, accounts, contacts, cases and outcomes
  // including invoices now too
  db.Client.hasMany(
    db.User,
    { foreignKey: 'f_clientId' },
    { onDelete: 'CASCADE' }
  );

  db.User.belongsTo(
    db.Client,
    { foreignKey: 'f_clientId' },
    { targetKey: 'id' }
  );
  db.User.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  db.RefreshToken.belongsTo(db.User);

  // sync all models with database
  await sequelize.sync();
}
