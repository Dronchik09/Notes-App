# NoteApp

## **🏗️ Загальна архітектура**

Це додаток для ведення нотаток, який складається з двох частин:

- **Frontend** (React) - те, що бачить користувач
- **Backend** (Node.js + Express) - сервер, який зберігає дані

## **📁 Структура проекту**

### Frontend (папка frontend)

src/

├── components/     # Компоненти React

├── redux/         # Управління станом

├── App.jsx        # Головний компонент

└── main.jsx       # Точка входу

### Backend (папка backend)

src/

├── controllers/   # Обробники запитів

├── services/      # Бізнес-логіка

├── router/        # Маршрути API

├── db/           # База даних

└── middlewares/   # Проміжне ПЗ

## **🎨 Frontend - що бачить користувач**

### 1. **Головний компонент App.jsx**

Це "мозок" додатку, який:

- Завантажує нотатки при запуску
- Керує станом (пошук, фільтри)
- Показує різні компоненти

### 2. **Redux Store** (store.js)

Це "пам'ять" додатку, де зберігається:

- Список всіх нотаток
- Стан завантаження
- Помилки
- Дані модального вікна

### 3. **Компоненти:**

### **CreateArea** - форма створення нотаток

- Поля для заголовка і тексту
- Валідація (заголовок мінімум 3 символи)
- Відправляє нову нотатку на сервер

### **SearchFilter** - пошук і фільтрація

- Пошук за заголовком
- Фільтр за датою створення
- Кнопки очищення фільтрів

### **NoteList** - відображення списку

- Сітка нотаток
- Підсвічування результатів пошуку
- Підрахунок кількості нотаток

### **Note** - окрема нотатка

- Показує заголовок, текст, дати
- Кнопки редагування і видалення
- Обрізає довгий текст

### **NoteModal** - модальне вікно редагування

- Редагування заголовка і тексту
- Збереження змін
- Закриття без збереження

### **LoadingSpinner** - індикатор завантаження

- Крутяться колесо під час запитів
- Показується під час операцій з сервером

## **🔄 Redux Slice (notesSlice.js)**

Тут описані всі дії з нотатками:

### **Асинхронні дії (API запити):**

- loadNotes - завантажити всі нотатки
- createNote - створити нову нотатку
- updateNote - оновити існуючу
- removeNote - видалити нотатку

### **Синхронні дії:**

- updateNoteInput - оновити поля форми
- showModal/hideModal - показати/сховати модальне вікно
- clearError - очистити помилки

## **🖥️ Backend - сервер**

### 1. **Точка входу** (index.js)

```jsx
// Підключається до MongoDB
await initMongoDB();
// Запускає сервер
startServer();
```

### 2. **Сервер** (server.js)

Налаштовує Express:

- CORS для frontend
- JSON парсер
- Логування запитів
- Маршрути для нотаток
- Обробка помилок

### 3. **Маршрути** (router/notes.js)

API endpoints:

- `GET /notes` - отримати всі нотатки
- `GET /notes/:id` - отримати одну нотатку
- `POST /notes` - створити нову
- `PATCH /notes/:id` - оновити частково
- `PUT /notes/:id` - замінити повністю
- `DELETE /notes/:id` - видалити

### 4. **Контролери** (controllers/notes.js)

Обробляють HTTP запити:

- Валідують дані
- Викликають сервіси
- Формують відповіді
- Обробляють помилки

### 5. **Сервіси** (services/notes.js)

Бізнес-логіка роботи з БД:

```jsx
export const getAllNotes = async () => {
  const notes = await NoteCollection.find();
  return notes;
};
```

### 6. **Модель даних** (db/models/Notes.js)

Схема MongoDB для нотаток:

```jsx
{
  title: String (обов'язково, 3-100 символів),
  content: String (необов'язково),
  createdAt: Date (автоматично),
  updatedAt: Date (автоматично)
}
```

## **🔄 Як працює взаємодія**

### Приклад створення нотатки:

1. **Frontend:** Користувач заповнює форму і натискає "Додати"
2. **Redux:** Викликається createNote action
3. **API:** Відправляється POST запит на `/notes`
4. **Backend:** Контролер валідує дані
5. **Database:** Сервіс зберігає в MongoDB
6. **Response:** Сервер повертає створену нотатку
7. **Frontend:** Redux оновлює список нотаток
8. **UI:** Компонент перерендериться з новою ноткою

### Приклад пошуку:

1. **UI:** Користувач вводить текст у пошук
2. **State:** searchQuery оновлюється
3. **Filter:** App.jsx фільтрує нотатки локально
4. **Render:** NoteList показує відфільтровані результати

## **📱 Особливості UI**

### **Стилізація:**

- CSS Modules для ізоляції стилів
- Градієнти і тіні для красивого вигляду
- Адаптивний дизайн для мобільних
- Плавні анімації і переходи

### **UX рішення:**

- Підсвічування результатів пошуку
- Індикатори завантаження
- Підтвердження перед видаленням
- Автоматичне приховування помилок через 5 сек

## **🔧 Технічні деталі**

### **Frontend стек:**

- React 19 + Vite (швидка збірка)
- Redux Toolkit (управління станом)
- CSS Modules (стилі)
- React Icons (іконки)

### **Backend стек:**

- Node.js + Express (сервер)
- MongoDB + Mongoose (база даних)
- Pino (логування)
- CORS (для frontend)

### **Розробка:**

- ESLint (перевірка коду)
- Prettier (форматування)
- Nodemon (автоперезапуск сервера)
- Concurrently (запуск frontend + backend)

## **🚀 Запуск проекту**

```powershell
# Корінь проекту - запустити все разом
npm run dev

# Або окремо:
cd frontend && npm run dev  # React на :5173
cd backend && npm run dev   # Express на :3001
```
