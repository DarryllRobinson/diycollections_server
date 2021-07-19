const db = require('helpers/db');

module.exports = {
  getAging,
};

async function getAging() {
  const reports = await getAccount(1);
  console.log('reports', reports);
  return basicDetails(account);
}

async function getByUser() {
  const reports = await db.Case.findAll();
  return reports.map((x) => basicDetails(x));
}

function basicDetails(report) {
  const {
    id,
    reportNumber,
    currentAssignment,
    initialAssignment,
    reportNotes,
    kamNotes,
    currentStatus,
    nextVisitDateTime,
    pendReason,
    resolution,
    reportReason,
    lockedDatetime,
    createdDate,
    createdBy,
    reassignedDate,
    reassignedBy,
    reopenedDate,
    reopenedBy,
    updatedDate,
    updatedBy,
    f_accountNumber,
  } = report;
  return {
    id,
    currentAssignment,
    currentAssignment,
  };
}

// helper functions

async function getAccount(id) {
  const account = await db.Account.findByPk(id);
  if (!account) throw 'Account not found';
  return account;
}
