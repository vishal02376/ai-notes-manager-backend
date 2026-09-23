const Note = require("../models/Note");


//Get All Notes

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdDate: -1 });
    res.status(200).json({ success: true, data: notes });
  } catch (err) {
    next(err);
  }
};

//Create a Note
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

//Update a Note
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


//Delete a Note
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
