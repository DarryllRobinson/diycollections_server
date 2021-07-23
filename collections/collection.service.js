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
    attributes: ['customerName', 'regIdNumber'],
    include: [
      {
        model: db.Account,
        attributes: [
          'amountDue',
          'accountNumber',
          'creditLimit',
          'currentBalance',
          'debtorAge',
          'totalBalance',
        ],
        include: [
          {
            model: db.Case,
            attributes: [
              'caseNotes',
              'caseNumber',
              'currentAssignment',
              'currentStatus',
              'nextVisitDateTime',
              'resolution',
              'updatedBy',
            ],
          },
        ],
      },
    ],
  });
  return collections.map((x) => collectionsFields(x));
}

async function getCollection() {
  const collections = await db.Customer.findAll({
    attributes: [
      'customerName',
      'customerEntity',
      'regIdNumber',
      'regIdStatus',
    ],
    include: [
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
          'totalBalance',
        ],
        include: [
          {
            model: db.Case,
            attributes: [
              'caseNotes',
              'caseNumber',
              'currentAssignment',
              'currentStatus',
              'kamNotes',
              'nextVisitDateTime',
              'resolution',
              'updatedBy',
            ],
          },
          {
            model: db.Contact,
            attributes: ['representativeName', 'representativeNumber'],
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
  console.log('collection: ' + JSON.stringify(collection));
  const {
    customerName,
    customerEntity,
    regIdNumber,
    regIdStatus,
    accounts: [
      {
        amountDue,
        accountNotes,
        accountNumber,
        accountStatus,
        creditLimit,
        currentBalance,
        days30,
        days60,
        days90,
        days120,
        days150,
        days180,
        days180Over,
        debtorAge,
        debitOrderDate,
        lastPaymentAmount,
        lastPaymentDate,
        lastPTPAmount,
        lastPTPDate,
        paymentDueDate,
        totalBalance,
        contact: { representativeName, representativeNumber },
        cases: [
          {
            caseNotes,
            caseNumber,
            currentAssignment,
            currentStatus,
            kamNotes,
            nextVisitDateTime,
            resolution,
            updatedBy,
          },
        ],
      },
    ],
  } = collection;

  return {
    customerName,
    customerEntity,
    regIdNumber,
    regIdStatus,
    amountDue,
    accountNotes,
    accountNumber,
    accountStatus,
    creditLimit,
    currentBalance,
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
    debtorAge,
    debitOrderDate,
    lastPaymentAmount,
    lastPaymentDate,
    lastPTPAmount,
    lastPTPDate,
    paymentDueDate,
    totalBalance,
    representativeName,
    representativeNumber,
    caseNotes,
    caseNumber,
    currentAssignment,
    currentStatus,
    kamNotes,
    nextVisitDateTime,
    resolution,
    updatedBy,
  };
}

function collectionsFields(collection) {
  //console.log('collection: ' + JSON.stringify(collection));
  const {
    customerName,
    regIdNumber,
    accounts: [
      {
        amountDue,
        accountNumber,
        creditLimit,
        currentBalance,
        debtorAge,
        totalBalance,
        cases: [
          {
            caseNotes,
            caseNumber,
            currentAssignment,
            currentStatus,
            nextVisitDateTime,
            resolution,
            updatedBy,
          },
        ],
      },
    ],
  } = collection;

  return {
    customerName,
    regIdNumber,
    amountDue,
    accountNumber,
    creditLimit,
    currentBalance,
    debtorAge,
    totalBalance,
    caseNotes,
    caseNumber,
    currentAssignment,
    currentStatus,
    nextVisitDateTime,
    resolution,
    updatedBy,
  };
}
