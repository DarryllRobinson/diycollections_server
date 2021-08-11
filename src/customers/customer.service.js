const db = require('../helpers/db');

module.exports = {
  getAll,
  getById,
  bulkCreate,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  try {
    const customers = await db.Customer.findAll();
    return customers.map((x) => basicDetails(x));
  } catch (err) {
    console.log('customerService.getAll error: ', err);
  }
}

async function getById(id) {
  const customer = await getCustomer(id);
  return basicDetails(customer);
}

async function bulkCreate(params) {
  // Count existing rows to be able to count number of affected rows
  const existingRows = await db.Customer.count({ distinct: 'customerName' });

  await db.Customer.bulkCreate(params);
  const totalRows = await db.Customer.count({ distinct: 'customerName' });

  return totalRows - existingRows;
}

async function create(params) {
  // validate
  if (
    await db.Customer.findOne({ where: { customerName: params.customerName } })
  ) {
    throw 'Customer "' + params.customerName + '" is already registered';
  }

  const customer = new db.Customer(params);

  // save customer
  await customer.save();

  return basicDetails(customer);
}

async function update(id, params) {
  const customer = await getCustomer(id);

  // validate (if email was changed)
  if (
    params.customerName &&
    customer.customerName !== params.customerName &&
    (await db.Customer.findOne({
      where: { customerName: params.customerName },
    }))
  ) {
    throw 'Customer "' + params.customerName + '" is already taken';
  }

  // copy params to customer and save
  Object.assign(customer, params);
  customer.updated = Date.now();
  await customer.save();

  return basicDetails(customer);
}

async function _delete(id) {
  const customer = await getCustomer(id);
  await customer.destroy();
}

// helper functions

async function getCustomer(id) {
  const customer = await db.Customer.findByPk(id);
  if (!customer) throw 'Customer not found';
  return customer;
}

function basicDetails(customer) {
  const {
    operatorShortCode,
    customerRefNo,
    customerName,
    customerEntity,
    regIdNumber,
    customerType,
    productType,
    address1,
    address2,
    address3,
    address4,
    address5,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    closedDate,
    closedBy,
    regIdStatus,
    f_clientId,
  } = customer;
  return {
    operatorShortCode,
    customerRefNo,
    customerName,
    customerEntity,
    regIdNumber,
    customerType,
    productType,
    address1,
    address2,
    address3,
    address4,
    address5,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    closedDate,
    closedBy,
    regIdStatus,
    f_clientId,
  };
}
