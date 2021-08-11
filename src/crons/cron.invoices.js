const cron = require('node-cron');
const db = require('../helpers/db');
const customerService = require('../customers/customer.service');
const sendEmail = require('../helpers/send-email');

setTimeout(() => {
  runInvoices();
}, 5000);

function runInvoices() {
  console.log('Starting runInvoices: ', db);
  customerService.getAll().then((customers) => {
    customers.forEach((customer) => {
      console.log('customerRefNo: ', customer.customerRefNo);
    });
  });
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
