const express = require('express');
const router = express.Router();
const cors = require('cors');
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const authorise = require('../middleware/authorise');
const Role = require('../helpers/role');
const invoiceService = require('./invoice.service');

const fs = require('fs');
const path = require('path');

// routes
router.get('/', authorise(), getAll);
router.post('/document/:id', cors(), getDocumentById);
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

function kakgetById(req, res, next) {
  console.log('fetching invoice: ', req.params.id);
  invoiceService
    .getById(req.params.id)
    .then((data) => {
      console.log('controller data: ', data);
      res.data = data;
      res
        .contentType('application/pdf')
        .send(
          `data:application/pdf;base64,${new Buffer.from(data).toString(
            'base64'
          )}`
        );
    })
    .catch(next);
}

function kakgetDocumentById(req, res, next) {
  console.log('getDocumentById req.params.id:', req.params.id);
  const filepath = path.join(__dirname, 'ref001/');

  const fileName = filepath + 'First_Customer.pdf';
  console.log('getDocumentById fileName:', fileName);
  //res.status(200).send('fileName');
  res.json(fileName);
}

function getDocumentById(req, res, next) {
  console.log('getDocumentById req.params.id:', req.params.id);
  const options = {
    root: path.join(__dirname, 'ref001/'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  /*const fileName = 'First_Customer.pdf';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent: ', path.join(__dirname, 'ref001/'), fileName);
    }
  });*/
  const filepath = path.join(__dirname, 'ref001/');
  const fileName = filepath + 'First_Customer.pdf';
  fs.readFile(fileName, (err, data) => {
    if (err) res.status(500).send(err);
    res
      .contentType('application/pdf')
      .send(
        `data:application/pdf;base64,${new Buffer.from(data).toString(
          'base64'
        )}`
      );
  });
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
