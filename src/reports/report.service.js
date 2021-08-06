const db = require('helpers/db');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

module.exports = {
  getAging,
  getAgentPTP,
  getDatePTP,
};

/*
Post.findAll({
  where: {
    [Op.or]: [{authorId: 12}, {authorId: 13}]
  }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;

Model.findAll({
  attributes: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
});
*/

async function getAging() {
  const reports = await db.Account.findAll({
    attributes: [
      [sequelize.fn('SUM', sequelize.col('currentBalance')), 'Current'],
      [sequelize.fn('SUM', sequelize.col('days30')), '30'],
      [sequelize.fn('SUM', sequelize.col('days60')), '60'],
      [sequelize.fn('SUM', sequelize.col('days90')), '90'],
      [sequelize.fn('SUM', sequelize.col('days120')), '120'],
      [sequelize.fn('SUM', sequelize.col('days150')), '150'],
      [sequelize.fn('SUM', sequelize.col('days180')), '180'],
      [sequelize.fn('SUM', sequelize.col('days180Over')), '>180'],
    ],
  });
  //console.log('reports', reports);
  //return basicDetails(reports);
  return reports;
}

async function getAgentPTP() {
  const reports = await db.Outcome.findAll({
    attributes: [
      ['createdBy', 'Agent'],
      [sequelize.fn('SUM', sequelize.col('ptpAmount')), 'Sum'],
    ],
    group: 'createdBy',
  });
  //console.log('reports', reports);
  //return basicDetails(reports);
  return reports;
}

async function getDatePTP() {
  const reports = await db.Outcome.findAll({
    attributes: [
      [sequelize.literal('SUBSTRING(ptpDate, 1, 10)'), 'ptpDate'],
      [sequelize.fn('SUM', sequelize.col('ptpAmount')), 'Sum'],
    ],
    where: { ptpDate: { [Op.ne]: null } },
    group: 'ptpDate',
  });
  //console.log('reports', reports);
  //return basicDetails(reports);
  return reports;
}

function basicDetails(report) {
  console.log('report: ', report);
  const {
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
  } = report;
  return {
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
  };
}

// helper functions

async function getAccount(id) {
  const account = await db.Account.findByPk(id);
  if (!account) throw 'Account not found';
  return account;
}
