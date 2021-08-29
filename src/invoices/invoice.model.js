const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    invoiceToken: { type: DataTypes.STRING },
    viewed: { type: DataTypes.DATE },
    invoiceLocation: { type: DataTypes.STRING },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: { type: DataTypes.DATE },
  };

  const options = {
    // disable default timestamp fields (createdAt and updatedAt)
    timestamps: false,
  };

  return sequelize.define('invoice', attributes, options);
}
