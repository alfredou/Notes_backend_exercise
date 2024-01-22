import { Op } from 'sequelize';
import Category from '../models/Category.js';

export async function createCategory(req, res) {
  const { category_name } = req.body;

  try {
    const categoryExists = await Category.findOne({
      where: {
        category_name: {
          [Op.iLike]: category_name, 
        },
      },
    });

    if (categoryExists) {
      return res.status(400).send('Category already exists');
    }

    const newCategory = await Category.create({
      category_name,
    });

    res.status(201).json(newCategory); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


export async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll({});

    res.status(200).json(categories); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


