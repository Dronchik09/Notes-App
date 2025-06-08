import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { updateNoteInput, createNote } from '../../redux/notesSlice';
import styles from './CreateArea.module.css';

export default function CreateArea() {
  const dispatch = useDispatch();
  const { note, isLoading } = useSelector((state) => state.notes);

  function handleInput(event) {
    const { name, value } = event.target;
    dispatch(updateNoteInput({ name, value }));
  }

  function validateForm() {
    if (!note.title || note.title.trim().length < 3) {
      alert('Заголовок має містити щонайменше 3 символи.');
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      dispatch(createNote({
        title: note.title.trim(),
        content: note.content.trim(),
      }));
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          onChange={handleInput}
          name="title"
          placeholder="Заголовок нотатки"
          value={note.title || ''}
          maxLength="100"
          disabled={isLoading}
        />
        <textarea
          className={styles.textarea}
          onChange={handleInput}
          name="content"
          placeholder="Напишіть вашу нотатку тут..."
          rows="4"
          value={note.content || ''}
          disabled={isLoading}
        />
        <button
          className={styles.button}
          disabled={!note.title || isLoading}
          type="submit"
        >
          <IoIosAddCircleOutline className={styles.icon} />
          {isLoading ? 'Створення...' : 'Додати нотатку'}
        </button>
      </form>
    </div>
  );
}