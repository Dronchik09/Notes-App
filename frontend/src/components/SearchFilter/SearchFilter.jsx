import React from 'react';
import { MdSearch, MdClear, MdFilterList } from 'react-icons/md';
import styles from './SearchFilter.module.css';

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) {
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearDateFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <MdSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Пошук за заголовком..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className={styles.clearButton}
              title="Очистити пошук"
            >
              <MdClear />
            </button>
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <MdFilterList className={styles.filterIcon} />
          <span>Фільтр за датою:</span>
        </div>
        
        <div className={styles.dateFilters}>
          <div className={styles.dateGroup}>
            <label htmlFor="startDate">Від:</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
          
          <div className={styles.dateGroup}>
            <label htmlFor="endDate">До:</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
          
          {(startDate || endDate) && (
            <button
              onClick={handleClearDateFilter}
              className={styles.clearDateButton}
              title="Очистити фільтр дат"
            >
              Очистити дати
            </button>
          )}
        </div>
      </div>

      {(searchQuery || startDate || endDate) && (
        <div className={styles.clearAllSection}>
          <button
            onClick={handleClearAll}
            className={styles.clearAllButton}
          >
            Очистити всі фільтри
          </button>
        </div>
      )}
    </div>
  );
}