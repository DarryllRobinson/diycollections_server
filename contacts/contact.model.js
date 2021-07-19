const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    primaryContactName: { type: DataTypes.STRING, allowNull: true },
    primaryContactNumber: { type: DataTypes.STRING, allowNull: true },
    primaryContactEmail: { type: DataTypes.STRING, allowNull: true },
    representativeName: { type: DataTypes.STRING, allowNull: true },
    representativeNumber: { type: DataTypes.STRING, allowNull: true },
    representativeEmail: { type: DataTypes.STRING, allowNull: true },
    alternativeRepName: { type: DataTypes.STRING, allowNull: true },
    alternativeRepNumber: { type: DataTypes.STRING, allowNull: true },
    alternativeRepEmail: { type: DataTypes.STRING, allowNull: true },
    otherNumber1: { type: DataTypes.STRING, allowNull: true },
    otherNumber2: { type: DataTypes.STRING, allowNull: true },
    otherNumber3: { type: DataTypes.STRING, allowNull: true },
    otherNumber4: { type: DataTypes.STRING, allowNull: true },
    otherNumber5: { type: DataTypes.STRING, allowNull: true },
    otherNumber6: { type: DataTypes.STRING, allowNull: true },
    otherNumber7: { type: DataTypes.STRING, allowNull: true },
    otherNumber8: { type: DataTypes.STRING, allowNull: true },
    otherNumber9: { type: DataTypes.STRING, allowNull: true },
    otherNumber10: { type: DataTypes.STRING, allowNull: true },
    otherEmail1: { type: DataTypes.STRING, allowNull: true },
    otherEmail2: { type: DataTypes.STRING, allowNull: true },
    otherEmail3: { type: DataTypes.STRING, allowNull: true },
    otherEmail4: { type: DataTypes.STRING, allowNull: true },
    otherEmail5: { type: DataTypes.STRING, allowNull: true },
    otherEmail6: { type: DataTypes.STRING, allowNull: true },
    otherEmail7: { type: DataTypes.STRING, allowNull: true },
    otherEmail8: { type: DataTypes.STRING, allowNull: true },
    otherEmail9: { type: DataTypes.STRING, allowNull: true },
    otherEmail10: { type: DataTypes.STRING, allowNull: true },
    dnc1: { type: DataTypes.STRING, allowNull: true },
    dnc2: { type: DataTypes.STRING, allowNull: true },
    dnc3: { type: DataTypes.STRING, allowNull: true },
    dnc4: { type: DataTypes.STRING, allowNull: true },
    dnc5: { type: DataTypes.STRING, allowNull: true },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: { type: DataTypes.STRING, allowNull: true },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
    f_accountNumber: { type: DataTypes.STRING, allowNull: false },
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
  return sequelize.define('contact', attributes);
}
