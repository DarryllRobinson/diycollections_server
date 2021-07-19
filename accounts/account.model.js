const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    accountNumber: { type: DataTypes.STRING, allowNull: false },
    accountName: { type: DataTypes.STRING, allowNull: false },
    openDate: { type: DataTypes.DATE, allowNull: true },
    debtorAge: { type: DataTypes.INTEGER, allowNull: true },
    paymentTermDays: { type: DataTypes.INTEGER, allowNull: true },
    creditLimit: { type: DataTypes.INTEGER, allowNull: true },
    totalBalance: { type: DataTypes.INTEGER, allowNull: true },
    amountDue: { type: DataTypes.INTEGER, allowNull: true },
    currentBalance: { type: DataTypes.INTEGER, allowNull: true },
    days30: { type: DataTypes.INTEGER, allowNull: true },
    days60: { type: DataTypes.INTEGER, allowNull: true },
    days90: { type: DataTypes.INTEGER, allowNull: true },
    days120: { type: DataTypes.INTEGER, allowNull: true },
    days150: { type: DataTypes.INTEGER, allowNull: true },
    days180: { type: DataTypes.INTEGER, allowNull: true },
    days180Over: { type: DataTypes.INTEGER, allowNull: true },
    paymentMethod: { type: DataTypes.STRING, allowNull: true },
    paymentDueDate: { type: DataTypes.INTEGER, allowNull: true },
    debitOrderDate: { type: DataTypes.INTEGER, allowNull: true },
    lastPaymentDate: { type: DataTypes.DATE, allowNull: true },
    lastPaymentAmount: { type: DataTypes.INTEGER, allowNull: true },
    lastPTPDate: { type: DataTypes.DATE, allowNull: true },
    lastPTPAmount: { type: DataTypes.INTEGER, allowNull: true },
    accountNotes: { type: DataTypes.STRING, allowNull: true },
    accountStatus: { type: DataTypes.STRING, allowNull: true },
    arg: { type: DataTypes.STRING, allowNull: true },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
    f_customerId: { type: DataTypes.STRING, allowNull: false },
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
