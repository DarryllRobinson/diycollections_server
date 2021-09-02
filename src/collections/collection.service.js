const db = require('../helpers/db');

module.exports = {
  getAll,
  getCollection,
};

async function getAll() {
  const collections = await db.Customer.findAll({
    attributes: ['customerRefNo', 'customerName', 'regIdNumber'],
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
              'updatedAt',
              'updatedBy',
            ],
          },
        ],
      },
    ],
  });
  return collections.map((x) => collectionsFields(x));
}

async function getCollection(id) {
  const collection = await db.Case.findAll({
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
    where: { caseNumber: id },
    include: [],
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
            model: db.Contact,
            attributes: ['representativeName', 'representativeNumber'],
          },

          {
            model: db.Customer,
            attributes: [
              'customerEntity',
              'customerName',
              'regIdNumber',
              'regIdStatus',
            ],
          },
        ],
      },
    ],
  });

  //console.log('collection: ' + JSON.stringify(collection));
  return collectionFields(collection);
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
  //console.log('collection: ' + JSON.stringify(collection));
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
    customerRefNo,
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
            updatedAt,
            updatedBy,
          },
        ],
      },
    ],
  } = collection;

  return {
    customerRefNo,
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
    updatedAt,
    updatedBy,
  };
}

function collectionFields(collection) {
  //console.log('************** collection: ' + JSON.stringify(collection));
  const [
    {
      caseNotes,
      caseNumber,
      currentAssignment,
      currentStatus,
      kamNotes,
      nextVisitDateTime,
      resolution,
      updatedBy,
      account: {
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
        customer: { customerEntity, customerName, regIdNumber },
      },
    },
  ] = collection;

  return {
    customerEntity,
    customerName,
    regIdNumber,
    representativeName,
    representativeNumber,
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
    caseNotes,
    caseNumber,
    currentAssignment,
    currentStatus,
    nextVisitDateTime,
    kamNotes,
    resolution,
    updatedBy,
  };
}
