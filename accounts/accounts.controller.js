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
    debtorAge: Joi.number(),
    paymentTermDays: Joi.number(),
    creditLimit: Joi.number().precision(2),
    totalBalance: Joi.number().precision(2),
    amountDue: Joi.number().precision(2),
    currentBalance: Joi.number().precision(2),
    days30: Joi.number().precision(2),
    days60: Joi.number().precision(2),
    days90: Joi.number().precision(2),
    days120: Joi.number().precision(2),
    days150: Joi.number().precision(2),
    days180: Joi.number().precision(2),
    days180Over: Joi.number().precision(2),
    paymentMethod: Joi.string(),
    paymentDueDate: Joi.number().precision(2),
    debitOrderDate: Joi.number().precision(2),
    lastPaymentDate: Joi.date(),
    lastPaymentAmount: Joi.number().precision(2),
    lastPTPDate: Joi.date(),
    lastPTPAmount: Joi.number().precision(2),
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
  const schema = Joi.object({
    accountNumber: Joi.string(),
    accountName: Joi.string(),
    openDate: Joi.date(),
    debtorAge: Joi.number(),
    paymentTermDays: Joi.number(),
    creditLimit: Joi.number().precision(2),
    totalBalance: Joi.number().precision(2),
    amountDue: Joi.number().precision(2),
    currentBalance: Joi.number().precision(2),
    days30: Joi.number().precision(2),
    days60: Joi.number().precision(2),
    days90: Joi.number().precision(2),
    days120: Joi.number().precision(2),
    days150: Joi.number().precision(2),
    days180: Joi.number().precision(2),
    days180Over: Joi.number().precision(2),
    paymentMethod: Joi.string(),
    paymentDueDate: Joi.number().precision(2),
    debitOrderDate: Joi.number().precision(2),
    lastPaymentDate: Joi.date(),
    lastPaymentAmount: Joi.number().precision(2),
    lastPTPDate: Joi.date(),
    lastPTPAmount: Joi.number().precision(2),
    accountNotes: Joi.string(),
    accountStatus: Joi.string(),
    arg: Joi.string(),
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
  });
  console.log(
    '******************************** updateSchema schema = ' + schema
  );
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
