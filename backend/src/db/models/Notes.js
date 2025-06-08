import { model, Schema } from 'mongoose';

const NoteSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: false,
      trim: true,
      default: ''
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const NoteCollection = model('notes', NoteSchema);

export default NoteCollection;