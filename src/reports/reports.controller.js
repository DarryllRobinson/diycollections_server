const express = require('express');
const router = express.Router();
const authorise = require('middleware/authorise');
const reportService = require('./report.service');

// routes
router.get('/aging', authorise(), getAging);
router.get('/agentPTP', authorise(), getAgentPTP);
router.get('/datePTP', authorise(), getDatePTP);

module.exports = router;

function getAging(req, res, next) {
  reportService
    .getAging()
    .then((reports) => res.json(reports))
    .catch(next);
}

function getAgentPTP(req, res, next) {
  reportService
    .getAgentPTP()
    .then((reports) => res.json(reports))
    .catch(next);
}

function getDatePTP(req, res, next) {
  reportService
    .getDatePTP()
    .then((reports) => res.json(reports))
    .catch(next);
}
