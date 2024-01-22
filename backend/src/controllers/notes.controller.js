import Note from "../models/note.js";
import Category from "../models/Category.js";

export async function getAllNotes(req, res) {
  try {
    const notesWithCategories = await Note.findAll({
      attributes: ['note_id', 'title', 'content', 'archived', 'createdAt', 'updatedAt'],
      include: [{
        model: Category,
        attributes: ['category_id', 'category_name'],
        as: 'Category',
      }],
    });

    return res.json(notesWithCategories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getOneNote(req, res) {
  const { id } = req.params;
  try {
    const noteWithCategory = await Note.findByPk(id, {
      attributes: ['note_id', 'title', 'content', 'archived', 'createdAt', 'updatedAt'],
      include: [{
        model: Category,
        attributes: ['category_id', 'category_name'], // Ajusta según los campos que desees incluir
        as: 'Category',
      }],
    });

    if (!noteWithCategory) {
      return res.status(404).json({
        message: 'Nota no encontrada',
      });
    }

    return res.json(noteWithCategory);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

export async function createNote(req, res) {
  const { title, content, category_id } = req.body;

  try {
    console.log(req.body)
    const newNote = await Note.create({
      title,
      content,
      category_id,
    }, {
      fields: ['title', 'content', 'category_id'],
    });
    res.json(newNote);
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateNote(req, res) {
  const { id } = req.params;
  const { title, content, archived, category_id } = req.body;

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).send('Note not found');
    }

    await note.update({
      title,
      content,
      archived,
      category_id
    });

    res.status(200).send('Note updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

export async function deleteNote(req, res) {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).send('Note not found');
    }

    await note.destroy();

    res.status(200).send('Note deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


    