const express = require('express');
const router = express.Router();
const authorise = require('middleware/authorise');
const collectionService = require('./collection.service');

// routes
router.get('/', authorise(), getAll);
router.get('/status', authorise(), getAllStatus);

module.exports = router;

function getAll(req, res, next) {
  collectionService
    .getAll()
    .then((collections) => res.json(collections))
    .catch(next);
}

function getAllStatus(req, res, next) {
  collectionService
    .getAllStatus(status)
    .then((collections) => res.json(collections))
    .catch(next);
}
