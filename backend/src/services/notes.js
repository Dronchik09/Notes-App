import NoteCollection from '../db/models/Notes.js';

export const getAllNotes = async () => {
  const notes = await NoteCollection.find();
  return notes;
};

export const getNoteById = async (id) => {
  const note = await NoteCollection.findById(id);
  return note;
};

export const createNote = async (payload) => {
  const note = await NoteCollection.create(payload);
  return note;
};

export const updateNote = async ({ _id, payload, options = {} }) => {
  const rawResult = await NoteCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
    includeResultMetadata: true,
  });
  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteNote = async (filter) => {
  return NoteCollection.findOneAndDelete(filter);
};
