import { Router } from 'express';
import {
  createNoteController,
  deleteNoteController,
  getNoteByIdController,
  getNotesController,
  patchNoteController,
  upsertNoteController,
} from '../controllers/notes.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const notesRouter = Router();

notesRouter.get('/', ctrlWrapper(getNotesController));
notesRouter.get('/:id', ctrlWrapper(getNoteByIdController));
notesRouter.post('/', ctrlWrapper(createNoteController));
notesRouter.put('/:id', ctrlWrapper(upsertNoteController));
notesRouter.patch('/:id', ctrlWrapper(patchNoteController));
notesRouter.delete('/:id', ctrlWrapper(deleteNoteController));

export default notesRouter;