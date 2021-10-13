const config = require('../helpers/config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const sendEmail = require('../helpers/send-email');
const tenantdb = require('../helpers/tenant.db');
const Role = require('../helpers/role');

module.exports = {
  getAll,
  getById,
  bulkCreate,
  create,
  update,
  delete: _delete,
};

async function connectDB(user, password, db) {
  const sequelize = await tenantdb.connect(user, password);
  return require(`../${db}s/${db}.model`)(sequelize);
}

async function getAll(user, password) {
  const db = await connectDB(user, password, 'account');
  const accounts = await db.findAll();
  return accounts.map((x) => basicDetails(x));
}

async function getById(id, user, password) {
  const account = await getAccount(id, user, password);
  return basicDetails(account);
}

async function bulkCreate(params, user, password) {
  //console.log('**************** bulkCreate', params, user, password);
  const db = await connectDB(user, password, 'account');
  // Count existing rows to be able to count number of affected rows
  const existingRows = await db.count({ distinct: 'accountNumber' });

  await db.bulkCreate(params);
  const totalRows = await db.count({ distinct: 'accountNumber' });

  return totalRows - existingRows;
}

async function create(params, user, password) {
  //console.log('**************** create', params, user, password);
  const db = await connectDB(user, password, 'account');
  // validate
  if (await db.findOne({ where: { name: params.name } })) {
    throw 'Account "' + params.name + '" is already registered';
  }

  const account = new db(params);

  // save account
  await account.save();

  return basicDetails(account);
}

async function update(id, params, user, password) {
  const account = await getAccount(id, user, password);

  // copy params to account and save
  //console.log('******************************** account params: ', params);
  Object.assign(account, params);
  account.updated = Date.now();
  const response = await account.save();

  return basicDetails(account);
}

async function _delete(id, user, password) {
  const account = await getAccount(id, user, password);
  await account.destroy();
}

// helper functions

async function getAccount(id, user, password) {
  const db = await connectDB(user, password, 'account');
  const account = await db.findByPk(id);
  if (!account) throw 'Account not found';
  return account;
}

function basicDetails(account) {
  const {
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
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    f_customerRefNo,
  } = account;
  return {
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
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    f_customerRefNo,
  };
}
