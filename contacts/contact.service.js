const db = require('helpers/db');

module.exports = {
  getAll,
  getById,
  bulkCreate,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const contacts = await db.Contact.findAll();
  return contacts.map((x) => basicDetails(x));
}

async function getById(id) {
  const contact = await getContact(id);
  return basicDetails(contact);
}

async function bulkCreate(params) {
  // Count existing rows to be able to count number of affected rows
  const existingRows = await db.Contact.count({ distinct: 'id' });

  await db.Contact.bulkCreate(params);
  const totalRows = await db.Contact.count({ distinct: 'id' });

  return totalRows - existingRows;
}

async function create(params) {
  // validate
  /*if (await db.Contact.findOne({ where: { name: params.name } })) {
    throw 'Contact "' + params.name + '" is already registered';
  }*/

  const contact = new db.Contact(params);

  // save contact
  await contact.save();

  return basicDetails(contact);
}

async function update(id, params) {
  const contact = await getContact(id);

  // validate (if email was changed)
  /*if (
    params.name &&
    contact.name !== params.name &&
    (await db.Contact.findOne({ where: { name: params.name } }))
  ) {
    throw 'Contact "' + params.name + '" is already taken';
  }*/

  // copy params to contact and save
  Object.assign(contact, params);
  contact.updated = Date.now();
  await contact.save();

  return basicDetails(contact);
}

async function _delete(id) {
  const contact = await getContact(id);
  await contact.destroy();
}

// helper functions

async function getContact(id) {
  const contact = await db.Contact.findByPk(id);
  if (!contact) throw 'Contact not found';
  return contact;
}

function basicDetails(contact) {
  const {
    id,
    primaryContactName,
    primaryContactNumber,
    primaryContactEmail,
    representativeName,
    representativeNumber,
    representativeEmail,
    alternativeRepName,
    alternativeRepNumber,
    alternativeRepEmail,
    otherNumber1,
    otherNumber2,
    otherNumber3,
    otherNumber4,
    otherNumber5,
    otherNumber6,
    otherNumber7,
    otherNumber8,
    otherNumber9,
    otherNumber10,
    otherEmail1,
    otherEmail2,
    otherEmail3,
    otherEmail4,
    otherEmail5,
    otherEmail6,
    otherEmail7,
    otherEmail8,
    otherEmail9,
    otherEmail10,
    dnc1,
    dnc2,
    dnc3,
    dnc4,
    dnc5,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy,
    f_accountNumber,
  } = contact;
  return {
    id,
    primaryContactName,
    primaryContactNumber,
    primaryContactEmail,
    representativeName,
    representativeNumber,
    representativeEmail,
    alternativeRepName,
    alternativeRepNumber,
    alternativeRepEmail,
    otherNumber1,
    otherNumber2,
    otherNumber3,
    otherNumber4,
    otherNumber5,
    otherNumber6,
    otherNumber7,
    otherNumber8,
    otherNumber9,
    otherNumber10,
    otherEmail1,
    otherEmail2,
    otherEmail3,
    otherEmail4,
    otherEmail5,
    otherEmail6,
    otherEmail7,
    otherEmail8,
    otherEmail9,
    otherEmail10,
    dnc1,
    dnc2,
    dnc3,
    dnc4,
    dnc5,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy,
    f_accountNumber,
  };
}
