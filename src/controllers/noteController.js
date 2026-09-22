const Note = require("../models/Note");

// @desc  Get all notes
// @route GET /api/notes
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdDate: -1 });
    res.status(200).json({ success: true, data: notes });
  } catch (err) {
    next(err);
  }
};

// @desc  Create a note
// @route POST /api/notes
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(201).json({ success: true, data: note });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400);
    }
    next(err);
  }
};

// @desc  Update a note
// @route PUT /api/notes/:id
const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    res.status(200).json({ success: true, data: note });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400);
    }
    next(err);
  }
};

// @desc  Delete a note
// @route DELETE /api/notes/:id
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
