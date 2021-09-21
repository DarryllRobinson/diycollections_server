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

  pool.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\`;`,
    (err, result) => {
      if (err) throw err;
      console.log('connection.query: ', result);
    }
  );

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('!!!!!!!!!!!!!!!!! Connected as id ', connection.threadId);

    connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\`;`,
      (err, result) => {
        connection.release();
        if (err) throw err;
        console.log('connection.query: ', result);
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
  db.Account = require('../accounts/account.model')(sequelize);
  db.Case = require('../cases/case.model')(sequelize);
  //db.Client = require('../clients/client.model')(sequelize);
  db.Contact = require('../contacts/contact.model')(sequelize);
  db.Customer = require('../customers/customer.model')(sequelize);
  db.Invoice = require('../invoices/invoice.model')(sequelize);
  db.Outcome = require('../outcomes/outcome.model')(sequelize);
  db.User = require('../users/user.model')(sequelize);
  db.RefreshToken = require('../users/refresh-token.model')(sequelize);

  // define relationships
  // add relationships for clients, customers, accounts, contacts, cases and outcomes
  // including invoices now too
  /*db.Client.hasMany(
    db.Customer,
    { foreignKey: 'f_clientId' },
    { onDelete: 'CASCADE' }
  );*/

  db.Customer.hasMany(
    db.Invoice,
    { foreignKey: 'f_customerRefNo' },
    { onDelete: 'CASCADE' }
  );

  db.Invoice.belongsTo(db.Customer, {
    foreignKey: 'f_customerRefNo',
    targetKey: 'customerRefNo',
  });

  db.Customer.hasMany(
    db.Account,
    { foreignKey: 'f_customerRefNo' },
    { onDelete: 'CASCADE' }
  );

  db.Account.belongsTo(db.Customer, {
    foreignKey: 'f_customerRefNo',
    targetKey: 'customerRefNo',
  });

  db.Account.hasMany(
    db.Case,
    {
      foreignKey: 'f_accountNumber',
    },
    { onDelete: 'CASCADE' }
  );

  db.Account.hasOne(
    db.Contact,
    {
      foreignKey: 'f_accountNumber',
    },
    { onDelete: 'CASCADE' }
  );

  db.Contact.belongsTo(db.Account, {
    foreignKey: 'f_accountNumber',
    targetKey: 'accountNumber',
  });

  db.Case.belongsTo(db.Account, {
    foreignKey: 'f_accountNumber',
    targetKey: 'accountNumber',
  });
  db.Case.hasMany(
    db.Outcome,
    {
      foreignKey: 'f_caseNumber',
    },
    { onDelete: 'CASCADE' }
  );

  db.Outcome.belongsTo(db.Case, {
    foreignKey: 'f_caseNumber',
    targetKey: 'caseNumber',
  });

  db.User.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  db.RefreshToken.belongsTo(db.User);

  // sync all models with database
  await sequelize.sync();
}
