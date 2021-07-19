const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    operatorShortCode: { type: DataTypes.STRING, allowNull: true },
    customerRefNo: { type: DataTypes.STRING, allowNull: false },
    customerName: { type: DataTypes.STRING, allowNull: false },
    customerEntity: { type: DataTypes.STRING, allowNull: false },
    regIdNumber: { type: DataTypes.STRING, allowNull: true },
    customerType: { type: DataTypes.STRING, allowNull: true },
    productType: { type: DataTypes.STRING, allowNull: true },
    address1: { type: DataTypes.STRING, allowNull: true },
    address2: { type: DataTypes.STRING, allowNull: true },
    address3: { type: DataTypes.STRING, allowNull: true },
    address4: { type: DataTypes.STRING, allowNull: true },
    address5: { type: DataTypes.STRING, allowNull: true },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
    closedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    closedBy: { type: DataTypes.STRING, allowNull: true },
    regIdStatus: { type: DataTypes.STRING, allowNull: true },
    f_clientId: { type: DataTypes.INTEGER, allowNull: false },
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
  return sequelize.define('customer', attributes);
}
