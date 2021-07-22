const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    caseNumber: { type: DataTypes.INTEGER, allowNull: true },
    currentAssignment: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Unassigned',
    },
    initialAssignment: { type: DataTypes.STRING, allowNull: true },
    caseNotes: { type: DataTypes.STRING, allowNull: true },
    kamNotes: { type: DataTypes.STRING, allowNull: true },
    currentStatus: { type: DataTypes.STRING, allowNull: true },
    pendReason: { type: DataTypes.STRING, allowNull: true },
    resolution: { type: DataTypes.STRING, allowNull: true },
    caseReason: { type: DataTypes.STRING, allowNull: true },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    lockedDatetime: { type: DataTypes.DATE, allowNull: true },
    reopenedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reopenedBy: { type: DataTypes.STRING, allowNull: true },
    nextVisitDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reassignedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reassignedBy: { type: DataTypes.STRING, allowNull: true },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
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
  return sequelize.define('case', attributes);
}
