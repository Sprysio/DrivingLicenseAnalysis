const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Data = sequelize.define('Data', {
    DATA_MC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    KOD_WOJ: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    WOJEWODZTWO: {
      type: DataTypes.STRING,
      allowNull: false,
      collate: 'C'
    },
    PLEC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    WIEK: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LICZBA: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{
    tableName: 'Data',
    timestamps: false,
    charset: 'utf8',
    collate: 'C'
  });
  
  module.exports = {Data}