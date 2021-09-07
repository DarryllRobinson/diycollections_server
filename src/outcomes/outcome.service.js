const db = require('../helpers/tenant.db');
//const db = require('../helpers/db');

module.exports = {
  getAll,
  getById,
  bulkCreate,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const outcomes = await db.Outcome.findAll();
  return outcomes.map((x) => basicDetails(x));
}

async function getById(id) {
  const outcomes = await db.Outcome.findAll({
    where: { f_caseNumber: id },
  });
  //console.log('outcomes: ', JSON.stringify(outcomes));
  return outcomes;
}

async function bulkCreate(params) {
  // Count existing rows to be able to count number of affected rows
  const existingRows = await db.Outcome.count({ distinct: 'id' });

  await db.Outcome.bulkCreate(params);
  const totalRows = await db.Outcome.count({ distinct: 'id' });

  return totalRows - existingRows;
}

async function create(params) {
  console.log('******************** outcome params: ', params);
  // validate
  /*if (await db.Outcome.findOne({ where: { name: params.name } })) {
    throw 'Outcome "' + params.name + '" is already registered';
  }*/

  const outcome = new db.Outcome(params);
  console.log('************************************ outcome: ', outcome);

  // save outcome
  await outcome.save();

  return basicDetails(outcome);
}

async function update(id, params) {
  const outcome = await getOutcome(id);

  // validate (if email was changed)
  /*if (
    params.name &&
    outcome.name !== params.name &&
    (await db.Outcome.findOne({ where: { name: params.name } }))
  ) {
    throw 'Outcome "' + params.name + '" is already taken';
  }*/

  // copy params to outcome and save
  Object.assign(outcome, params);
  outcome.updated = Date.now();
  await outcome.save();

  return basicDetails(outcome);
}

async function _delete(id) {
  const outcome = await getOutcome(id);
  await outcome.destroy();
}

// helper functions

async function getOutcome(id) {
  const outcome = await db.Outcome.findByPk(id);
  if (!outcome) throw 'Outcome not found';
  return outcome;
}

function basicDetails(outcome) {
  const {
    id,
    outcomeStatus,
    transactionType,
    numberCalled,
    emailUsed,
    contactPerson,
    outcomeResolution,
    ptpDate,
    ptpAmount,
    debitResubmissionDate,
    debitResubmissionAmount,
    outcomeNotes,
    nextSteps,
    createdAt,
    createdBy,
    caseId,
  } = outcome;
  return {
    status: 'Ok',
    id,
    outcomeStatus,
    transactionType,
    numberCalled,
    emailUsed,
    contactPerson,
    outcomeResolution,
    ptpDate,
    ptpAmount,
    debitResubmissionDate,
    debitResubmissionAmount,
    outcomeNotes,
    nextSteps,
    createdAt,
    createdBy,
    caseId,
  };
}
