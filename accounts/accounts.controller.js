const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorise = require('middleware/authorise');
const accountService = require('./account.service');

// routes
router.get('/', authorise(), getAll);
router.get('/:id', authorise(), getById);
router.post('/bulk', authorise(), bulkCreate);
router.post('/', authorise(), createSchema, create);
router.put('/:id', authorise(), updateSchema, update);
router.delete('/:id', authorise(), _delete);

module.exports = router;

function getAll(req, res, next) {
  accountService
    .getAll()
    .then((accounts) => res.json(accounts))
    .catch(next);
}

function getById(req, res, next) {
  accountService
    .getById(req.params.id)
    .then((account) => (account ? res.json(account) : res.sendStatus(404)))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    accountNumber: Joi.string().required(),
    accountName: Joi.string().required(),
    openDate: Joi.date(),
    debtorAge: Joi.integer(),
    paymentTermDays: Joi.integer(),
    creditLimit: Joi.integer(),
    totalBalance: Joi.integer(),
    amountDue: Joi.integer(),
    currentBalance: Joi.integer(),
    days30: Joi.integer(),
    days60: Joi.integer(),
    days90: Joi.integer(),
    days120: Joi.integer(),
    days150: Joi.integer(),
    days180: Joi.integer(),
    days180Over: Joi.integer(),
    paymentMethod: Joi.string(),
    paymentDueDate: Joi.integer(),
    debitOrderDate: Joi.integer(),
    lastPaymentDate: Joi.date(),
    lastPaymentAmount: Joi.integer(),
    lastPTPDate: Joi.date(),
    lastPTPAmount: Joi.integer(),
    accountNotes: Joi.string(),
    accountStatus: Joi.string(),
    arg: Joi.string(),
    createdBy: Joi.string().required(),
    updatedBy: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function bulkCreate(req, res, next) {
  accountService
    .bulkCreate(req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function create(req, res, next) {
  accountService
    .create(req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    accountNumber: Joi.string().required(),
    accountName: Joi.string().required(),
    openDate: Joi.date(),
    debtorAge: Joi.integer(),
    paymentTermDays: Joi.integer(),
    creditLimit: Joi.integer(),
    totalBalance: Joi.integer(),
    amountDue: Joi.integer(),
    currentBalance: Joi.integer(),
    days30: Joi.integer(),
    days60: Joi.integer(),
    days90: Joi.integer(),
    days120: Joi.integer(),
    days150: Joi.integer(),
    days180: Joi.integer(),
    days180Over: Joi.integer(),
    paymentMethod: Joi.string(),
    paymentDueDate: Joi.integer(),
    debitOrderDate: Joi.integer(),
    lastPaymentDate: Joi.date(),
    lastPaymentAmount: Joi.integer(),
    lastPTPDate: Joi.date(),
    lastPTPAmount: Joi.integer(),
    accountNotes: Joi.string(),
    accountStatus: Joi.string(),
    arg: Joi.string(),
    createdBy: Joi.string().required(),
    updatedBy: Joi.string(),
  };
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  accountService
    .update(req.params.id, req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function _delete(req, res, next) {
  accountService
    .delete(req.params.id)
    .then(() => res.json({ message: 'Account deleted successfully' }))
    .catch(next);
}
