const db = require('helpers/db');

module.exports = {
  getAll,
  getByUser,
};

async function getAll() {
  const queues = await db.Case.findAll();
  return queues.map((x) => basicDetails(x));
}

async function getByUser() {
  const queues = await db.Case.findAll();
  return queues.map((x) => basicDetails(x));
}

function basicDetails(queue) {
  const {
    id,
    queueNumber,
    currentAssignment,
    initialAssignment,
    queueNotes,
    kamNotes,
    currentStatus,
    nextVisitDateTime,
    pendReason,
    resolution,
    queueReason,
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
  } = queue;
  return {
    id,
    currentAssignment,
    currentStatus,
  };
}
