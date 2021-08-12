const cron = require('node-cron');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const db = require('../helpers/db');
const sendEmail = require('../helpers/send-email');
const createFolder = require('../helpers/create-folder');

setTimeout(() => {
  runInvoices();
}, 5000);

async function runInvoices() {
  console.log('Starting runInvoices');
  const records = await fetchRecords();

  // Loop through records
  records.forEach((record) => {
    //console.log(record.customerName);
    const info = {
      Title: record.customerName + ' invoice',
      Author: 'The System Collections Platform',
      Subject: 'Invoice from MIE',
    };

    let doc = new PDFDocument({
      font: 'Helvetica',
      info,
      margin: 40,
      size: 'A4',
    });

    // Populate the document with various information and variables
    header(doc, record);

    // Make a folder for the invoice
    createFolder(
      __dirname + `/invoices/${record.customerRefNo}`,
      0744,
      function (err) {
        if (err) console.error(err);
        //else console.log(`Created folder for ${record.customerName}`);
      }
    );

    createInvoice(doc, record);
    // create email with link to invoice
    doc.end();
  });
  console.log(`Finished running ${records.length} invoices`);
}

async function fetchRecords() {
  const records = await db.Customer.findAll({
    attributes: [
      'customerName',
      'customerRefNo',
      'address1',
      'address2',
      'address3',
      'address4',
      'address5',
      'f_clientId',
    ],
    limit: 2,
  });
  return records;
}

function header(doc, record) {
  doc
    .fontSize(8)
    .text(`INVOICE TO: ${record.customerName.substring(0, 15)}`, 30, 30)
    .text(`DELIVER TO: ${record.customerName.substring(0, 15)}`, 180, 30)
    .text(`Managed Integrity Evaluation (MIE)`, 390, 30)
    .text(`XXXX Limited`, 30, 45)
    .text(`XXXX Group`, 180, 45)
    .text(`Building 2`, 390, 45)
    .text(`P.O. Box 0000`, 30, 60)
    .text(`P.O. Box 509741`, 180, 60)
    .text(`Jean Park Chambers`, 390, 60)
    .text(`Randburg`, 30, 75)
    .text(`Randburg`, 180, 75)
    .text(`252 Jean Avenue`, 390, 75)
    .text(`2125`, 30, 90)
    .text(`2125`, 180, 90)
    .text(`Centurion`, 390, 90)
    .text(`0157`, 390, 105);

  doc
    .fontSize(8)
    .text('INVOICE TO: XXXX Limited', 30, 30)
    .text('DELIVER TO: XXXX Limited', 180, 30)
    .text('Managed Integrity Evaluation (MIE)', 390, 30)
    .text('XXXX Limited', 30, 45)
    .text('XXXX Group', 180, 45)
    .text('Building 2', 390, 45)
    .text('P.O. Box 0000', 30, 60)
    .text('P.O. Box 509741', 180, 60)
    .text('Jean Park Chambers', 390, 60)
    .text('Randburg', 30, 75)
    .text('Randburg', 180, 75)
    .text('252 Jean Avenue', 390, 75)
    .text('2125', 30, 90)
    .text('2125', 180, 90)
    .text('Centurion', 390, 90)
    .text('0157', 390, 105);

  doc.text('VAT No. 400000', 30, 130);
  doc.text('DFI 46100000', 110, 130, { align: 'left' });
  doc.text('DATE', 180, 130);

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(10, 150)
    .lineTo(600, 150)
    .stroke();
}

function setItems(item) {
  return {
    item: item.code,
    description: item.description,
    quantity: item.qty,
    price: item.unitPrice,
    tax: '',
  };
}

function createInvoice(doc, record) {
  //console.log('createInvoice: ', record.customerRefNo);
  // First remove forward slashes from the customer name so as not to break the folder structure
  const name = record.customerName.replace(/\//g, ' ');
  try {
    doc.pipe(
      fs.createWriteStream(
        __dirname + `/invoices/${record.customerRefNo}/${name}.pdf`
      )
    );
  } catch (err) {
    console.error(err);
  }
}

async function sendInvoices(user, origin) {
  const client = 'MIE';
  let message;
  if (origin) {
    const verifyUrl = `${origin}/users/verify-email?token=${user.verificationToken}`;
    message = `<p>Please click below to verify your email address:</p>
              <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  } else {
    message = `<p>Please use the token below to verify your email address with the <code>/user/verify-email</code> api route:</p>
              <p><code>${user.verificationToken}</code></p>`;
  }

  await sendEmail({
    to: user.email,
    subject: 'The System Collections Platform - Verify Email',
    html: `<h4>Invoice from ${client}</h4>
               <p>Thanks for registering!</p>
               ${message}`,
  });
}
