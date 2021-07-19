const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const sendEmail = require('helpers/send-email');
const db = require('helpers/db');
const Role = require('helpers/role');

module.exports = {
  getAll,
  getById,
  bulkCreate,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const accounts = await db.Account.findAll();
  return accounts.map((x) => basicDetails(x));
}

async function getById(id) {
  const account = await getAccount(id);
  return basicDetails(account);
}

async function bulkCreate(params) {
  // Count existing rows to be able to count number of affected rows
  const existingRows = await db.Account.count({ distinct: 'accountNumber' });

  await db.Account.bulkCreate(params);
  const totalRows = await db.Account.count({ distinct: 'accountNumber' });

  return totalRows - existingRows;
}

async function create(params) {
  // validate
  if (await db.Account.findOne({ where: { name: params.name } })) {
    throw 'Account "' + params.name + '" is already registered';
  }

  const account = new db.Account(params);

  // save account
  await account.save();

  return basicDetails(account);
}

async function update(id, params) {
  const account = await getAccount(id);

  // validate (if email was changed)
  if (
    params.name &&
    account.name !== params.name &&
    (await db.Account.findOne({ where: { name: params.name } }))
  ) {
    throw 'Account "' + params.name + '" is already taken';
  }

  // copy params to account and save
  Object.assign(account, params);
  account.updated = Date.now();
  await account.save();

  return basicDetails(account);
}

async function _delete(id) {
  const account = await getAccount(id);
  await account.destroy();
}

// helper functions

async function getAccount(id) {
  const account = await db.Account.findByPk(id);
  if (!account) throw 'Account not found';
  return account;
}

function basicDetails(account) {
  const {
    id,
    accountNumber,
    accountName,
    openDate,
    debtorAge,
    paymentTermDays,
    creditLimit,
    totalBalance,
    amountDue,
    currentBalance,
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
    paymentMethod,
    paymentDueDate,
    debitOrderDate,
    lastPaymentDate,
    lastPaymentAmount,
    lastPTPDate,
    lastPTPAmount,
    accountNotes,
    accountStatus,
    arg,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy,
    f_customerId,
  } = account;
  return {
    id,
    accountNumber,
    accountName,
    openDate,
    debtorAge,
    paymentTermDays,
    creditLimit,
    totalBalance,
    amountDue,
    currentBalance,
    days30,
    days60,
    days90,
    days120,
    days150,
    days180,
    days180Over,
    paymentMethod,
    paymentDueDate,
    debitOrderDate,
    lastPaymentDate,
    lastPaymentAmount,
    lastPTPDate,
    lastPTPAmount,
    accountNotes,
    accountStatus,
    arg,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy,
    f_customerId,
  };
}
