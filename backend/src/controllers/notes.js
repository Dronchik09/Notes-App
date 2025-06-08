import createHttpError from 'http-errors';
import * as noteServices from '../services/notes.js';

export const getNotesController = async (req, res) => {
  const notes = await noteServices.getAllNotes();

  res.json({
    status: 200,
    message: 'Successfully found notes!',
    data: notes,
  });
};

export const getNoteByIdController = async (req, res) => {
  const { id } = req.params;
  const note = await noteServices.getNoteById(id);

  if (!note) {
    throw createHttpError(404, 'Note not found!');
  }

  res.json({
    status: 200,
    message: `Successfully found note with id ${id}!`,
    data: note,
  });
};

export const createNoteController = async (req, res) => {
  const { title, content } = req.body;
  
  if (!title || title.trim().length < 3) {
    throw createHttpError(400, 'Title must be at least 3 characters long');
  }
  
  const data = await noteServices.createNote({
    title: title.trim(),
    content: content?.trim() || ''
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created note!',
    data,
  });
};

export const upsertNoteController = async (req, res) => {
  const { id: _id } = req.params;
  const result = await noteServices.updateNote({
    _id,
    payload: req.body,
    options: { upsert: true },
  });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Note upserted',
    data: result.data,
  });
};

export const patchNoteController = async (req, res) => {
  const { id: _id } = req.params;
  const result = await noteServices.updateNote({ _id, payload: req.body });

  if (!result) {
    throw createHttpError(404, 'Note not found!');
  }
  res.json({
    status: 200,
    message: `Successfully patched a note!`,
    data: result.data,
  });
};

export const deleteNoteController = async (req, res) => {
  const { id: _id } = req.params;
  const data = await noteServices.deleteNote({ _id });

  if (!data) {
    throw createHttpError(404, 'Note not found!');
  }

  res.status(204).send();
};