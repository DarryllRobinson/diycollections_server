const express = require('express');
const router = express.Router();
const authorise = require('middleware/authorise');
const reportService = require('./report.service');

// routes
router.get('/aging', authorise(), getAging);

module.exports = router;

function getAging(req, res, next) {
  reportService
    .getAging()
    .then((reports) => res.json(reports))
    .catch(next);
}
