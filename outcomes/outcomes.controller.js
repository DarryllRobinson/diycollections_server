const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorise = require('middleware/authorise');
const outcomeService = require('./outcome.service');

// routes
router.get('/', authorise(), getAll);
router.get('/:id', authorise(), getById);
router.post('/bulk', authorise(), bulkCreate);
router.post('/', authorise(), createSchema, create);
router.put('/:id', authorise(), updateSchema, update);
router.delete('/:id', authorise(), _delete);

module.exports = router;

function getAll(req, res, next) {
  outcomeService
    .getAll()
    .then((outcomes) => res.json(outcomes))
    .catch(next);
}

function getById(req, res, next) {
  outcomeService
    .getById(req.params.id)
    .then((outcome) => (outcome ? res.json(outcome) : res.sendStatus(404)))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    outcomeStatus: Joi.string(),
    transactionType: Joi.string(),
    numberCalled: Joi.string(),
    emailUsed: Joi.string(),
    contactPerson: Joi.string(),
    outcomeResolution: Joi.string(),
    ptpDate: Joi.date(),
    ptpAmount: Joi.number(),
    debitResubmissionDate: Joi.date(),
    debitResubmissionAmount: Joi.number(),
    outcomeNotes: Joi.string(),
    nextSteps: Joi.string(),
    createdDate: Joi.date().required(),
    createdBy: Joi.string().required(),
    f_caseId: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function bulkCreate(req, res, next) {
  outcomeService
    .bulkCreate(req.body)
    .then((outcome) => res.json(outcome))
    .catch(next);
}

function create(req, res, next) {
  outcomeService
    .create(req.body)
    .then((outcome) => res.json(outcome))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    outcomeStatus: Joi.string(),
    transactionType: Joi.string(),
    numberCalled: Joi.string(),
    emailUsed: Joi.string(),
    contactPerson: Joi.string(),
    outcomeResolution: Joi.string(),
    ptpDate: Joi.date(),
    ptpAmount: Joi.number(),
    debitResubmissionDate: Joi.date(),
    debitResubmissionAmount: Joi.number(),
    outcomeNotes: Joi.string(),
    nextSteps: Joi.string(),
    createdDate: Joi.date().required(),
    createdBy: Joi.string().required(),
    f_caseId: Joi.string().required(),
  };
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  outcomeService
    .update(req.params.id, req.body)
    .then((outcome) => res.json(outcome))
    .catch(next);
}

function _delete(req, res, next) {
  outcomeService
    .delete(req.params.id)
    .then(() => res.json({ message: 'Outcome deleted successfully' }))
    .catch(next);
}
