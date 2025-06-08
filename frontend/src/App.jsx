import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import CreateArea from './components/CreateArea/CreateArea';
import NoteModal from './components/NoteModal/NoteModal';
import NoteList from './components/NoteList/NoteList';
import SearchFilter from './components/SearchFilter/SearchFilter';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { hideModal, showModal, removeNote, loadNotes, clearError } from './redux/notesSlice';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const { notesList, modalShow, modalTitle, modalContent, modalId, isLoading, error } = useSelector((state) => state.notes);

  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleExpandNote = (note) => {
    dispatch(showModal({ id: note._id, title: note.title, content: note.content }));
  };

  const handleDeleteNote = (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю нотатку?')) {
      dispatch(removeNote(id));
    }
  };

  const filteredNotes = notesList.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = true;
    if (startDate || endDate) {
      const noteDate = new Date(note.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate + 'T23:59:59') : null;
      
      if (start && end) {
        matchesDate = noteDate >= start && noteDate <= end;
      } else if (start) {
        matchesDate = noteDate >= start;
      } else if (end) {
        matchesDate = noteDate <= end;
      }
    }

    return matchesSearch && matchesDate;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Мої Нотатки</h1>
      </header>
      
      <main className="app-main">
        {error && (
          <div className="error-message">
            <p>Помилка: {error}</p>
            <button onClick={() => dispatch(clearError())}>Закрити</button>
          </div>
        )}

        <CreateArea />
        
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        
        <NoteModal
          title={modalTitle}
          content={modalContent}
          id={modalId}
          show={modalShow}
          onHide={() => dispatch(hideModal())}
        />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <NoteList
            notesList={filteredNotes}
            expandNote={handleExpandNote}
            deleteNote={handleDeleteNote}
            searchQuery={searchQuery}
          />
        )}
      </main>
    </div>
  );
}