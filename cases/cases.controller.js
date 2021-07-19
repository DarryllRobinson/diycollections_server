const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorise = require('middleware/authorise');
const caseService = require('./case.service');

// routes
router.get('/', authorise(), getAll);
router.get('/:id', authorise(), getById);
router.post('/bulk', authorise(), bulkCreate);
router.post('/', authorise(), createSchema, create);
router.put('/:id', authorise(), updateSchema, update);
router.delete('/:id', authorise(), _delete);

module.exports = router;

function getAll(req, res, next) {
  caseService
    .getAll()
    .then((cases) => res.json(cases))
    .catch(next);
}

function getById(req, res, next) {
  caseService
    .getById(req.params.id)
    .then((caseObject) =>
      caseObject ? res.json(caseObject) : res.sendStatus(404)
    )
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    caseNumber: Joi.string().required(),
    currentAssignment: Joi.string().required(),
    initialAssignment: Joi.string(),
    caseNotes: Joi.string(),
    kamNotes: Joi.string(),
    currentStatus: Joi.string(),
    pendReason: Joi.string(),
    resolution: Joi.string(),
    caseReason: Joi.string(),
    lockedDatetime: Joi.date(),
    createdDate: Joi.date().required(),
    createdBy: Joi.string().required(),
    reassignedDate: Joi.date(),
    reassignedBy: Joi.string(),
    reopenedDate: Joi.date(),
    reopenedBy: Joi.string(),
    updatedDate: Joi.date(),
    updatedBy: Joi.string(),
    f_accountNumber: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function bulkCreate(req, res, next) {
  caseService
    .bulkCreate(req.body)
    .then((caseObject) => res.json(caseObject))
    .catch(next);
}

function create(req, res, next) {
  caseService
    .create(req.body)
    .then((caseObject) => res.json(caseObject))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    caseNumber: Joi.string().required(),
    currentAssignment: Joi.string().required(),
    initialAssignment: Joi.string(),
    caseNotes: Joi.string(),
    kamNotes: Joi.string(),
    currentStatus: Joi.string(),
    pendReason: Joi.string(),
    resolution: Joi.string(),
    caseReason: Joi.string(),
    lockedDatetime: Joi.date(),
    createdDate: Joi.date().required(),
    createdBy: Joi.string().required(),
    reassignedDate: Joi.date(),
    reassignedBy: Joi.string(),
    reopenedDate: Joi.date(),
    reopenedBy: Joi.string(),
    updatedDate: Joi.date(),
    updatedBy: Joi.string(),
    f_accountNumber: Joi.string().required(),
  };
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  caseService
    .update(req.params.id, req.body)
    .then((caseObject) => res.json(caseObject))
    .catch(next);
}

function _delete(req, res, next) {
  caseService
    .delete(req.params.id)
    .then(() => res.json({ message: 'Case deleted successfully' }))
    .catch(next);
}
