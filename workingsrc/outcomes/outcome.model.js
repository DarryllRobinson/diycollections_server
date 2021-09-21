const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    outcomeStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Open',
    },
    transactionType: { type: DataTypes.STRING, allowNull: true },
    numberCalled: { type: DataTypes.STRING, allowNull: true },
    emailUsed: { type: DataTypes.STRING, allowNull: true },
    contactPerson: { type: DataTypes.STRING, allowNull: true },
    outcomeResolution: { type: DataTypes.STRING, allowNull: true },
    ptpDate: { type: DataTypes.DATE, allowNull: true },
    ptpAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
    debitResubmissionDate: { type: DataTypes.DATE, allowNull: true },
    debitResubmissionAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
    outcomeNotes: { type: DataTypes.STRING, allowNull: true },
    nextSteps: { type: DataTypes.STRING, allowNull: true },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    f_caseNumber: {
      type: DataTypes.STRING,
      references: { model: db.Case, key: 'caseNumber' },
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
  return sequelize.define('outcome', attributes);
}
