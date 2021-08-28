const db = require('../helpers/db');
const fs = require('fs');
const path = require('path');

module.exports = {
  getById,
};

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
