const db = require('helpers/db');

module.exports = {
  getAll,
};

/*
Places.findById(req.params.id, {
    include: [{
        model: Reviews,
        required: false,
        include: [{
            model: Users,
            required: false
        }]
    }]
}).then(function(place) {
    // The rest of your logic here...
});
*/

async function getAll() {
  const collections = await db.Customer.findAll({
    attributes: ['customerName'],
    include: [
      {
        model: db.Account,
        attributes: ['amountDue', 'accountNotes'],
        include: [
          {
            model: db.Case,
            attributes: ['caseNumber'],
            include: [{ model: db.Outcome, attributes: ['outcomeNotes'] }],
          },
        ],
      },
    ],
  });
  return collections.map((x) => queueFields(x));
}

async function getAllStatus(recordStatus) {
  const collections = await db.Case.findAll({
    attributes: [
      'caseNumber',
      'caseNotes',
      'currentAssignment',
      'currentStatus',
      'kamNotes',
      'nextVisitDateTime',
      'resolution',
      'updatedAt',
      'updatedBy',
    ],
    include: [
      {
        model: db.Outcome,
        attributes: ['outcomeNotes'],
      },
    ],
    where: { currentStatus: recordStatus },
  });
  return collections.map((x) => queueFields(x));
}

function queueFields(collection) {
  const {
    caseNumber,
    amountDue,
    accountNotes,
    accountNumber,
    accountStatus,
    caseNotes,
    creditLimit,
    currentAssignment,
    currentBalance,
    currentStatus,
    customerEntity,
    customerName,
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
    debtorAge,
    debitOrderDate,
    kamNotes,
    lastPaymentAmount,
    lastPaymentDate,
    lastPTPAmount,
    lastPTPDate,
    nextVisitDateTime,
    paymentDueDate,
    pendReason,
    regIdNumber,
    regIdStatus,
    resolution,
    representativeName,
    representativeNumber,
    totalBalance,
    updatedBy,
    updatedDate,
  } = collection;
  console.log('collection: ' + JSON.stringify(collection));
  return {
    caseNumber,
    amountDue,
    accountNotes,
    accountNumber,
    accountStatus,
    caseNotes,
    creditLimit,
    currentAssignment,
    currentBalance,
    currentStatus,
    customerEntity,
    customerName,
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
    debtorAge,
    debitOrderDate,
    kamNotes,
    lastPaymentAmount,
    lastPaymentDate,
    lastPTPAmount,
    lastPTPDate,
    nextVisitDateTime,
    paymentDueDate,
    pendReason,
    regIdNumber,
    regIdStatus,
    resolution,
    representativeName,
    representativeNumber,
    totalBalance,
    updatedBy,
    updatedDate,
  };
}

/*async function getAll() {
  const collections = await db.Customer.findAll({
    include: [
      {
        model: db.Customer,
        attributes: [
          'customerEntity',
          'customerName',
          'regIdNumber',
          'regIdStatus',
        ],
      },
      {
        model: db.Account,
        attributes: [
          'amountDue',
          'accountNotes',
          'accountNumber',
          'accountStatus',
          'creditLimit',
          'currentBalance',
          'days30',
          'days60',
          'days90',
          'days120',
          'days150',
          'days180',
          'days180Over',
          'debtorAge',
          'debitOrderDate',
          'lastPaymentAmount',
          'lastPaymentDate',
          'lastPTPAmount',
          'lastPTPDate',
          'paymentDueDate',
        ],
      },
    ],
  });
  return collections.map((x) => basicDetails(x));
}

function basicDetails(collection) {
  const {
    caseId,
    caseNumber,
    amountDue,
    accountNotes,
    accountNumber,
    accountStatus,
    caseNotes,
    creditLimit,
    currentAssignment,
    currentBalance,
    currentStatus,
    customerEntity,
    customerName,
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
    debtorAge,
    debitOrderDate,
    kamNotes,
    lastPaymentAmount,
    lastPaymentDate,
    lastPTPAmount,
    lastPTPDate,
    nextVisitDateTime,
    paymentDueDate,
    pendReason,
    regIdNumber,
    regIdStatus,
    resolution,
    representativeName,
    representativeNumber,
    totalBalance,
    updatedBy,
    updatedDate,
  } = collection;
  return {
    caseId,
    caseNumber,
    amountDue,
    accountNotes,
    accountNumber,
    accountStatus,
    caseNotes,
    creditLimit,
    currentAssignment,
    currentBalance,
    currentStatus,
    customerEntity,
    customerName,
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
    debtorAge,
    debitOrderDate,
    kamNotes,
    lastPaymentAmount,
    lastPaymentDate,
    lastPTPAmount,
    lastPTPDate,
    nextVisitDateTime,
    paymentDueDate,
    pendReason,
    regIdNumber,
    regIdStatus,
    resolution,
    representativeName,
    representativeNumber,
    totalBalance,
    updatedBy,
    updatedDate,
  };
}
*/
