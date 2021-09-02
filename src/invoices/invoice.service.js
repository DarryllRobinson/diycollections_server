const db = require('../helpers/db');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const sendEmail = require('../helpers/send-email');

module.exports = {
  getAll,
  getById,
  saveNewInvoice,
  verifyInvoice,
};

async function getAll() {
  try {
    const invoices = await db.Invoice.findAll();
    return invoices.map((invoice) => getAllDetails(invoice));
  } catch (err) {
    console.error(err);
  }
}

async function getById(id) {
  console.log('service get id: ', id);
  const filepath = path.join(__dirname, '/ref001/First_Customer.pdf');
  console.log('service get filepath: ', filepath);

  fs.readFile(await filepath, function (err, data) {
    if (err) {
      return 'not found';
    }
    //console.log('returning data: ', data);
    return data;
  });
}

function getAllDetails(invoice) {
  const { customerRefNo, viewed } = invoice;
  return { customerRefNo, viewed };
}

async function saveNewInvoice(invoiceLocation, customerRefNo) {
  // create new invoice object
  const invoice = new db.Invoice();
  invoice.invoiceToken = randomTokenString();
  invoice.invoiceLocation = invoiceLocation;
  invoice.customerRefNo = customerRefNo;

  // save invoice
  await invoice.save();

  // send email to customer
  await sendInvoice(invoice);
}

async function verifyInvoice({ token }) {
  const invoice = await db.Invoice.findOne({ where: { invoiceToken: token } });

  if (!invoice) throw 'Verification failed';

  invoice.viewed = Date.now();
  await invoice.save();
  //console.log('invoice.invoiceLocation: ', invoice.invoiceLocation);
  return invoice.invoiceLocation;
}

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

async function sendInvoice(invoice) {
  // don't have access to req.origin so have to work out the link from the REACT_APP_STAGE variable
  let link;
  switch (process.env.REACT_APP_STAGE) {
    case 'development':
      link = `http://localhost:3000/invoices/view-invoice?token=${invoice.invoiceToken}`;
      break;
    case 'sit':
      link = `https://sit.thesystem.co.za/invoices/view-invoice?token=${invoice.invoiceToken}`;

    case 'uat':
      link = `https://sit.thesystem.co.za/invoices/view-invoice?token=${invoice.invoiceToken}`;

    case 'production':
      link = `https://thesystem.co.za/invoices/view-invoice?token=${invoice.invoiceToken}`;

    default:
      link = `http://localhost:3000/invoices/view-invoice?token=${invoice.invoiceToken}`;
  }

  const client = 'MIE';
  let message;
  message = `<p>Please click below to view your invoice:</p>
              <p><a href="${link}">View my invoice</a></p>`;

  await sendEmail({
    //to: user.email,
    to: 'darryll@thesystem.co.za',
    subject: 'The System Collections Platform - Invoice',
    html: `<h4>Invoice from ${client}</h4>
               <p>Thank you for continued business!</p>
               ${message}`,
  });
}
