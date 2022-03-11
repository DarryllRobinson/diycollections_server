const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const authorise = require('../middleware/authorise');
const Role = require('../helpers/role');
const mappingService = require('./mapping.service');

// routes
router.get('/', authorise(), getAll);
router.get('/:id', authorise(), getById);
router.post('/bulk', authorise(), bulkCreate);
router.post('/', authorise(), createSchema, create);
router.put('/', authorise(), updateSchema, update);
router.delete('/:id', authorise(), _delete);

module.exports = router;

function getAll(req, res, next) {
  const { tenant, passwordHash } = req.user;
  mappingService
    .getAll(tenant, passwordHash)
    .then((mappings) => res.json(mappings))
    .catch(next);
}

function getById(req, res, next) {
  const { tenant, passwordHash } = req.user;
  mappingService
    .getById(req.params.id, tenant, passwordHash)
    .then((mapping) => (mapping ? res.json(mapping) : res.sendStatus(404)))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    primaryMappingName: Joi.string(),
    primaryMappingNumber: Joi.string(),
    primaryMappingEmail: Joi.string(),
    representativeName: Joi.string(),
    representativeNumber: Joi.string(),
    representativeEmail: Joi.string(),
    alternativeRepName: Joi.string(),
    alternativeRepNumber: Joi.string(),
    alternativeRepEmail: Joi.string(),
    otherNumber1: Joi.string(),
    otherNumber2: Joi.string(),
    otherNumber3: Joi.string(),
    otherNumber4: Joi.string(),
    otherNumber5: Joi.string(),
    otherNumber6: Joi.string(),
    otherNumber7: Joi.string(),
    otherNumber8: Joi.string(),
    otherNumber9: Joi.string(),
    otherNumber10: Joi.string(),
    otherEmail1: Joi.string(),
    otherEmail2: Joi.string(),
    otherEmail3: Joi.string(),
    otherEmail4: Joi.string(),
    otherEmail5: Joi.string(),
    otherEmail6: Joi.string(),
    otherEmail7: Joi.string(),
    otherEmail8: Joi.string(),
    otherEmail9: Joi.string(),
    otherEmail10: Joi.string(),
    dnc1: Joi.string(),
    dnc2: Joi.string(),
    dnc3: Joi.string(),
    dnc4: Joi.string(),
    dnc5: Joi.string(),
    createdDate: Joi.date().required(),
    createdBy: Joi.string().required(),
    updatedDate: Joi.date(),
    updatedBy: Joi.string(),
    f_accountNumber: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function bulkCreate(req, res, next) {
  const { tenant, passwordHash } = req.user;
  mappingService
    .bulkCreate(req.body, tenant, passwordHash)
    .then((mapping) => res.json(mapping))
    .catch(next);
}

function create(req, res, next) {
  const { tenant, passwordHash } = req.user;
  mappingService
    .create(req.body, tenant, passwordHash)
    .then((mapping) => res.json(mapping))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    primaryMappingName: Joi.string(),
    primaryMappingNumber: Joi.string(),
    primaryMappingEmail: Joi.string(),
    representativeName: Joi.string(),
    representativeNumber: Joi.string(),
    representativeEmail: Joi.string(),
    alternativeRepName: Joi.string(),
    alternativeRepNumber: Joi.string(),
    alternativeRepEmail: Joi.string(),
    otherNumber1: Joi.string(),
    otherNumber2: Joi.string(),
    otherNumber3: Joi.string(),
    otherNumber4: Joi.string(),
    otherNumber5: Joi.string(),
    otherNumber6: Joi.string(),
    otherNumber7: Joi.string(),
    otherNumber8: Joi.string(),
    otherNumber9: Joi.string(),
    otherNumber10: Joi.string(),
    otherEmail1: Joi.string(),
    otherEmail2: Joi.string(),
    otherEmail3: Joi.string(),
    otherEmail4: Joi.string(),
    otherEmail5: Joi.string(),
    otherEmail6: Joi.string(),
    otherEmail7: Joi.string(),
    otherEmail8: Joi.string(),
    otherEmail9: Joi.string(),
    otherEmail10: Joi.string(),
    dnc1: Joi.string(),
    dnc2: Joi.string(),
    dnc3: Joi.string(),
    dnc4: Joi.string(),
    dnc5: Joi.string(),
    createdBy: Joi.string(),
    updatedDate: Joi.date(),
    updatedBy: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  const { tenant, passwordHash } = req.user;
  mappingService
    .update(req.params.id, req.body, tenant, passwordHash)
    .then((mapping) => res.json(mapping))
    .catch(next);
}

function _delete(req, res, next) {
  const { tenant, passwordHash } = req.user;
  mappingService
    .delete(req.params.id, tenant, passwordHash)
    .then(() => res.json({ message: 'Mapping deleted successfully' }))
    .catch(next);
}
