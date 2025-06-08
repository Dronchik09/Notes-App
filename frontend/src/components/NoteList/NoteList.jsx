import React from 'react';
import Note from '../Note/Note';
import styles from './NoteList.module.css';

export default function NoteList({ notesList, expandNote, deleteNote, searchQuery }) {
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className={styles.highlight}>{part}</mark>
      ) : (
        part
      )
    );
  };

  if (!notesList || notesList.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Немає нотаток</h3>
        <p>
          {searchQuery ? 
            `Не знайдено нотаток за запитом "${searchQuery}"` : 
            'Створіть вашу першу нотатку, використовуючи форму вище'
          }
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {searchQuery ? 
          `Результати пошуку: ${notesList.length} нотаток` : 
          `Ваші нотатки (${notesList.length})`
        }
      </h2>
      <div className={styles.grid}>
        {notesList.map((note) => (
          <Note
            key={note._id}
            note={note}
            expandNote={expandNote}
            deleteNote={deleteNote}
            highlightText={highlightText}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
}