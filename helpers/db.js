const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
  });

  // init models and add them to the exported db object
  db.Account = require('../accounts/account.model')(sequelize);
  db.Case = require('../cases/case.model')(sequelize);
  db.Contact = require('../contacts/contact.model')(sequelize);
  db.Customer = require('../customers/customer.model')(sequelize);
  db.Outcome = require('../outcomes/outcome.model')(sequelize);
  db.User = require('../users/user.model')(sequelize);
  db.RefreshToken = require('../users/refresh-token.model')(sequelize);

  // define relationships
  // add relationships for customers, accounts, contacts, cases and outcomes
  db.Customer.hasMany(db.Account, { onDelete: 'CASCADE' });

  db.Account.belongsTo(db.Customer);
  db.Account.hasMany(db.Case, { onDelete: 'CASCADE' });
  db.Account.hasOne(db.Contact, { onDelete: 'CASCADE' });

  db.Contact.belongsTo(db.Account);

  db.Case.belongsTo(db.Account);
  db.Case.hasMany(db.Outcome, { onDelete: 'CASCADE' });

  db.Outcome.belongsTo(db.Case);

  db.User.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  db.RefreshToken.belongsTo(db.User);

  // sync all models with database
  await sequelize.sync();
}
