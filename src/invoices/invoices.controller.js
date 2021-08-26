const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const authorise = require('../middleware/authorise');
const Role = require('../helpers/role');
const invoiceService = require('./invoice.service');

// routes
router.get('/', authorise(), getAll);
router.get('/:id', authorise(), getById);
router.post('/bulk', authorise(), bulkCreate);
router.post('/', authorise(), createSchema, create);
router.put('/:id', authorise(), updateSchema, update);
router.delete('/:id', authorise(), _delete);

module.exports = router;

function getAll(req, res, next) {
  invoiceService
    .getAll()
    .then((invoices) => res.json(invoices))
    .catch(next);
}

function getById(req, res, next) {
  invoiceService
    .getById(req.params.id)
    .then((invoice) => (invoice ? res.json(invoice) : res.sendStatus(404)))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    operatorShortCode: Joi.string(),
    invoiceRefNo: Joi.string().required(),
    invoiceName: Joi.string().required(),
    invoiceEntity: Joi.string().required(),
    regIdNumber: Joi.string(),
    invoiceType: Joi.string(),
    productType: Joi.string(),
    address1: Joi.string(),
    address2: Joi.string(),
    address3: Joi.string(),
    address4: Joi.string(),
    address5: Joi.string(),
    createdDate: Joi.date(),
    createdBy: Joi.string().required(),
    updatedDate: Joi.date(),
    updatedBy: Joi.string(),
    closedDate: Joi.date(),
    closedBy: Joi.string(),
    regIdStatus: Joi.string(),
    f_clientId: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function bulkCreate(req, res, next) {
  invoiceService
    .bulkCreate(req.body)
    .then((invoice) => res.json(invoice))
    .catch(next);
}

function create(req, res, next) {
  invoiceService
    .create(req.body)
    .then((invoice) => res.json(invoice))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    operatorShortCode: Joi.string(),
    invoiceRefNo: Joi.string().required(),
    invoiceName: Joi.string().required(),
    invoiceEntity: Joi.string().required(),
    regIdNumber: Joi.string(),
    invoiceType: Joi.string(),
    productType: Joi.string(),
    address1: Joi.string(),
    address2: Joi.string(),
    address3: Joi.string(),
    address4: Joi.string(),
    address5: Joi.string(),
    createdDate: Joi.date().required(),
    createdBy: Joi.string().required(),
    updatedDate: Joi.date(),
    updatedBy: Joi.string(),
    closedDate: Joi.date(),
    closedBy: Joi.string(),
    regIdStatus: Joi.string(),
    f_clientId: Joi.number().required(),
  };
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  invoiceService
    .update(req.params.id, req.body)
    .then((invoice) => res.json(invoice))
    .catch(next);
}

function _delete(req, res, next) {
  invoiceService
    .delete(req.params.id)
    .then(() => res.json({ message: 'Customer deleted successfully' }))
    .catch(next);
}
