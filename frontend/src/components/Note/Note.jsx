import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from './Note.module.css';

export default function Note({ note, expandNote, deleteNote, highlightText, searchQuery }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Невідомо';
    return new Date(dateString).toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNote(note._id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    expandNote(note);
  };

  const handleClick = () => {
    expandNote(note);
  };

  return (
    <article className={styles.note} onClick={handleClick}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          {highlightText ? highlightText(note.title, searchQuery) : note.title}
        </h3>
        <p className={styles.text}>
          {highlightText ? highlightText(note.content, searchQuery) : note.content}
        </p>
        
        <div className={styles.dates}>
          <small className={styles.date}>
            Створено: {formatDate(note.createdAt)}
          </small>
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <small className={styles.date}>
              Оновлено: {formatDate(note.updatedAt)}
            </small>
          )}
        </div>
      </div>
      
      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={handleEdit}
          title="Редагувати"
        >
          <MdEdit />
        </button>
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          title="Видалити"
        >
          <MdDelete />
        </button>
      </div>
    </article>
  );
}