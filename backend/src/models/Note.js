import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import Category from './Category.js';

const Note = sequelize.define('Note', {
  note_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
});

Note.belongsTo(Category, { foreignKey: 'category_id', as: 'Category'});
Category.hasMany(Note, { foreignKey: 'category_id' });

export default Note