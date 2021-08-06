const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    accountNumber: { type: DataTypes.STRING, primaryKey: true },
    accountName: { type: DataTypes.STRING, allowNull: false },
    openDate: { type: DataTypes.DATE, allowNull: true },
    debtorAge: { type: DataTypes.INTEGER, allowNull: true },
    paymentTermDays: { type: DataTypes.INTEGER, allowNull: true },
    creditLimit: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    totalBalance: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    amountDue: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    currentBalance: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    days30: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    days60: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    days90: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    days120: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    days150: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    days180: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    days180Over: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    paymentMethod: { type: DataTypes.STRING, allowNull: true },
    paymentDueDate: { type: DataTypes.INTEGER, allowNull: true },
    debitOrderDate: { type: DataTypes.INTEGER, allowNull: true },
    lastPaymentDate: { type: DataTypes.DATE, allowNull: true },
    lastPaymentAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    lastPTPDate: { type: DataTypes.DATE, allowNull: true },
    lastPTPAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    accountNotes: { type: DataTypes.STRING, allowNull: true },
    accountStatus: { type: DataTypes.STRING, allowNull: true },
    arg: { type: DataTypes.STRING, allowNull: true },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
    f_customerRefNo: {
      type: DataTypes.STRING,
      references: { model: db.Customer, key: 'customerRefNo' },
    },
  };

  /*const options = {
    // disable default timestamp fields (createdAt and updatedAt)
    timestamps: false,
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ['passwordHash'] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };*/

  //return sequelize.define('account', attributes, options);
  return sequelize.define('account', attributes);
}
