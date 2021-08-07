const db = require('../helpers/db');

module.exports = {
  getAll,
  getById,
  bulkCreate,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const cases = await db.Case.findAll();
  return cases.map((x) => basicDetails(x));
}

async function getById(id) {
  const caseObject = await getCase(id);
  return basicDetails(caseObject);
}

async function bulkCreate(params) {
  // Count existing rows to be able to count number of affected rows
  const existingRows = await db.Case.count({ distinct: 'id' });

  await db.Case.bulkCreate(params);
  const totalRows = await db.Case.count({ distinct: 'id' });

  return totalRows - existingRows;
}

async function create(params) {
  // validate
  if (await db.Case.findOne({ where: { name: params.name } })) {
    throw 'Case "' + params.name + '" is already registered';
  }

  const caseObject = new db.Case(params);

  // save case
  await caseObject.save();

  return basicDetails(caseObject);
}

async function update(id, params) {
  const caseObject = await getCase(id);

  // validate (if email was changed)
  if (
    params.name &&
    caseObject.name !== params.name &&
    (await db.Case.findOne({ where: { name: params.name } }))
  ) {
    throw 'Case "' + params.name + '" is already taken';
  }

  // copy params to case and save
  Object.assign(caseObject, params);
  caseObject.updated = Date.now();
  await caseObject.save();

  return basicDetails(caseObject);
}

async function _delete(id) {
  const caseObject = await getCase(id);
  await caseObject.destroy();
}

// helper functions

async function getCase(id) {
  const caseObject = await db.Case.findByPk(id);
  if (!caseObject) throw 'Case not found';
  return caseObject;
}

function basicDetails(caseObject) {
  const {
    id,
    caseNumber,
    currentAssignment,
    initialAssignment,
    caseNotes,
    kamNotes,
    currentStatus,
    nextVisitDateTime,
    pendReason,
    resolution,
    caseReason,
    lockedDatetime,
    createdAt,
    createdBy,
    reassignedDate,
    reassignedBy,
    reopenedDate,
    reopenedBy,
    updatedAt,
    updatedBy,
    accountNumber,
  } = caseObject;
  return {
    id,
    caseNumber,
    currentAssignment,
    initialAssignment,
    caseNotes,
    kamNotes,
    currentStatus,
    nextVisitDateTime,
    pendReason,
    resolution,
    caseReason,
    lockedDatetime,
    createdAt,
    createdBy,
    reassignedDate,
    reassignedBy,
    reopenedDate,
    reopenedBy,
    updatedAt,
    updatedBy,
    accountNumber,
  };
}
