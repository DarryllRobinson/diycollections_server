const express = require('express');
const router = express.Router();
const authorise = require('middleware/authorise');
const queueService = require('./queue.service');

// routes
router.get('/', authorise(), getAll);

module.exports = router;

function getAll(req, res, next) {
  queueService
    .getAll()
    .then((queues) => res.json(queues))
    .catch(next);
}
