import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, hideModal } from '../../redux/notesSlice';
import { MdClose, MdSave } from 'react-icons/md';
import styles from './NoteModal.module.css';

export default function NoteModal({ title, content, id, show }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.notes);
  const [editTitle, setEditTitle] = useState(title || '');
  const [editContent, setEditContent] = useState(content || '');

  useEffect(() => {
    setEditTitle(title || '');
    setEditContent(content || '');
  }, [title, content]);

  const handleSave = () => {
    if (editTitle.trim().length < 3) {
      alert('Заголовок має містити щонайменше 3 символи.');
      return;
    }

    dispatch(
      updateNote({
        id,
        title: editTitle.trim(),
        content: editContent.trim(),
      }),
    ).then(() => {
      dispatch(hideModal());
    });
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Редагувати нотатку</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            disabled={isLoading}
          >
            <MdClose />
          </button>
        </div>

        <div className={styles.body}>
          <input
            className={styles.input}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Заголовок нотатки"
            maxLength="100"
            disabled={isLoading}
          />
          <textarea
            className={styles.textarea}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Зміст нотатки"
            rows="8"
            disabled={isLoading}
          />
        </div>

        <div className={styles.footer}>
          <button
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={isLoading}
          >
            Скасувати
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isLoading}
          >
            <MdSave className={styles.icon} />
            {isLoading ? 'Збереження...' : 'Зберегти'}
          </button>
        </div>
      </div>
    </div>
  );
}
