const cron = require('node-cron');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const db = require('../helpers/db');
const sendEmail = require('../helpers/send-email');
const createFolder = require('../helpers/create-folder');

setTimeout(() => {
  //runInvoices();
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

  doc.text('VAT No. 400000', 30, 120);

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(10, 130)
    .lineTo(600, 130)
    .stroke();

  doc.text('Inv. No.', 30, 135, { align: 'left' });
  doc.text('DFI 46100000', 110, 135, { align: 'left' });
  doc.text('DATE', 180, 135);
  doc.text('13 AUG 2021', 250, 135);
  doc.text('CUST. No.', 330, 135);
  doc.text('CXXXX0001', 400, 135);

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(10, 145)
    .lineTo(600, 145)
    .stroke();

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(10, 147)
    .lineTo(600, 147)
    .stroke();

  doc.text('CUST. ORDER', 30, 150, { align: 'left' });
  doc.text('PROJECT', 180, 150, { align: 'left' });
  doc.text('INV. CONTACT', 330, 150);
  doc.text('Danny Hlabatau', 400, 150);

  doc.text('REF. A', 30, 160);
  doc.text('12345', 110, 160);
  doc.text('CONTRACT', 180, 160);
  doc.text('BUS CONTACT', 330, 160);
  doc.text('REF. B', 30, 170);
  doc.text('None', 110, 170);
  doc.text('END CUST.', 180, 170);
  doc.text('SALES AREA', 330, 170);

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(10, 180)
    .lineTo(600, 180)
    .stroke();

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(10, 182)
    .lineTo(600, 182)
    .stroke();

  // Vertical lines

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(100, 130)
    .lineTo(100, 180)
    .stroke();

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(170, 130)
    .lineTo(170, 180)
    .stroke();

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(240, 130)
    .lineTo(240, 180)
    .stroke();

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(320, 130)
    .lineTo(320, 180)
    .stroke();

  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(390, 130)
    .lineTo(390, 180)
    .stroke();

  // Line items
  doc.text('Line', 30, 185);
  doc.text('Code', 70, 185);
  doc.text('Description', 110, 185);
  doc.text('Qty', 300, 185);
  doc.text('Unit', 330, 185);
  doc.text('Unit Price', 360, 185);
  doc.text('Nett Price', 490, 185);
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
