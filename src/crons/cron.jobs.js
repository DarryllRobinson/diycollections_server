const cron = require('node-cron');
const db = require('../helpers/db');

unlockCollections();

function unlockCollections() {
  cron.schedule('*/15 * * * *', () => {
    console.log(
      '******************************** running unlockCollections now'
    );
    db.Case.update(
      { currentStatus: 'Open' },
      { where: { currentStatus: 'Locked' } }
    );
  });
}
