import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const BOOKS_PER_PAGE = 9;

const BASE_BOOKS = [
  {
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    rating: 4.9,
    description: 'Роман о добре и зле, любви и трусости.',
    price: 890,
    color: '#8e44ad',
  },
  {
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    rating: 4.8,
    description: 'История бывшего студента Раскольникова.',
    price: 780,
    color: '#c0392b',
  },
  {
    title: 'Война и мир',
    author: 'Лев Толстой',
    rating: 4.7,
    description: 'Эпопея о России эпохи Наполеоновских войн.',
    price: 1290,
    color: '#2c3e50',
  },
  {
    title: 'Анна Каренина',
    author: 'Лев Толстой',
    rating: 4.6,
    description: 'Трагическая история любви.',
    price: 950,
    color: '#16a085',
  },
  {
    title: 'Тихий Дон',
    author: 'Михаил Шолохов',
    rating: 4.5,
    description: 'Судьба донского казачества.',
    price: 1100,
    color: '#d35400',
  },
  {
    title: 'Евгений Онегин',
    author: 'Александр Пушкин',
    rating: 4.9,
    description: 'Роман в стихах.',
    price: 650,
    color: '#2980b9',
  },
  {
    title: 'Герой нашего времени',
    author: 'Михаил Лермонтов',
    rating: 4.6,
    description: 'Психологический роман о Печорине.',
    price: 720,
    color: '#7f8c8d',
  },
  {
    title: 'Мёртвые души',
    author: 'Николай Гоголь',
    rating: 4.5,
    description: 'Похождения Чичикова.',
    price: 690,
    color: '#27ae60',
  },
  {
    title: 'Отцы и дети',
    author: 'Иван Тургенев',
    rating: 4.4,
    description: 'Конфликт поколений.',
    price: 610,
    color: '#e67e22',
  },
];

// 27 книг → 3 страницы по 9 книг.
// «Страниц может быть 20» — пагинация это выдержит,
// потому что номера строятся динамически.
const BOOKS = Array.from({ length: 27 }, (_, i) => {
  const base = BASE_BOOKS[i % BASE_BOOKS.length];
  return { ...base, id: i + 1 };
});

function BookCard({ book }) {
  return (
    <article className="book-card" data-testid="book-card">
      <div className="book-cover" style={{ background: book.color }}>
        <span className="book-cover-letter">{book.title.slice(0, 1)}</span>
      </div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <div className="book-rating" aria-label={`Рейтинг ${book.rating}`}>
        {'★'.repeat(Math.round(book.rating))}
        <span className="book-rating-value">{book.rating.toFixed(1)}</span>
      </div>
      <p className="book-description">{book.description}</p>
      <div className="book-price">{book.price} ₽</div>
    </article>
  );
}

function getPageNumbers(current, total, maxVisible = 5) {
  const pages = [];
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  const end = Math.min(total, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }
  return { pages, start, end };
}

function Pagination({ currentPage, totalPages, onChange }) {
  const { pages, start, end } = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Пагинация">
      <button
        type="button"
        data-testid="page-previous"
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        ← Назад
      </button>

      {start > 1 && <span className="page-ellipsis">…</span>}

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          data-testid="page-number"
          className={`page-btn page-number${p === currentPage ? ' active' : ''}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && <span className="page-ellipsis">…</span>}

      <button
        type="button"
        data-testid="page-next"
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        Вперёд →
      </button>

      <span data-testid="page-indicator" className="page-indicator">
        Страница {currentPage} из {totalPages}
      </span>
    </nav>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(BOOKS.length / BOOKS_PER_PAGE);

  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const pageBooks = BOOKS.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  const handleChange = (page) => {
    const safe = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(safe);
  };

  return (
    <div className="app">
      <h1 className="app-title">Книжный магазин</h1>

      <section className="book-list" aria-label="Список книг">
        {pageBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handleChange}
      />
    </div>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');

if (!rootElement) {
  throw new Error('Корневой элемент приложения не найден.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);