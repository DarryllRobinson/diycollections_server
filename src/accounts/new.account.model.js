const account_view = `SELECT * FROM accounts;`;

module.exports = {
  up: function (database, Sequelize) {
    return database.query(`CREATE VIEW ${account_view} AS ${query};`);
  },
  down: function (database, Sequelize) {
    return database.query(`DROP VIEW ${account_view};`);
  },
};
