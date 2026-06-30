import { useState, useEffect, useReducer, createContext, useContext } from 'react';

// ---------- Context: Theme ----------
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('react-todo.theme') ||
      (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('react-todo.theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => t === 'dark' ? 'light' : 'dark');
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ---------- Reducer: Todos ----------
const STORAGE_KEY = 'react-todo.items';
const initial = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [{ id: Date.now().toString(36), text: action.text, done: false, createdAt: Date.now() }, ...state];
    case 'toggle':
      return state.map((t) => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'delete':
      return state.filter((t) => t.id !== action.id);
    case 'edit':
      return state.map((t) => t.id === action.id ? { ...t, text: action.text } : t);
    case 'clear-done':
      return state.filter((t) => !t.done);
    default:
      return state;
  }
}

// ---------- Components ----------
function TodoItem({ todo, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const saveEdit = () => {
    if (text.trim()) dispatch({ type: 'edit', id: todo.id, text: text.trim() });
    setEditing(false);
  };

  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      <input type="checkbox" checked={todo.done} onChange={() => dispatch({ type: 'toggle', id: todo.id })} />
      {editing ? (
        <input
          className="edit-input"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
        />
      ) : (
        <span className="todo-text" onDoubleClick={() => setEditing(true)}>{todo.text}</span>
      )}
      <button className="delete-btn" onClick={() => dispatch({ type: 'delete', id: todo.id })}>×</button>
    </li>
  );
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initial);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const { theme, toggle } = useTheme();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const add = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'add', text: input.trim() });
      setInput('');
    }
  };

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="app">
      <header className="app__header">
        <h1>⚡ React Todo</h1>
        <button className="icon-btn" onClick={toggle}>{theme === 'light' ? '☀️' : '🌙'}</button>
      </header>

      <form className="add-form" onSubmit={add}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All ({todos.length})</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active ({remaining})</button>
        <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Done ({todos.length - remaining})</button>
        {todos.some((t) => t.done) && <button className="clear-btn" onClick={() => dispatch({ type: 'clear-done' })}>Clear done</button>}
      </div>

      <ul className="todo-list">
        {filtered.length === 0 ? (
          <li className="empty">{todos.length === 0 ? 'No todos yet. Add one above!' : 'No todos match this filter.'}</li>
        ) : (
          filtered.map((t) => <TodoItem key={t.id} todo={t} dispatch={dispatch} />)
        )}
      </ul>

      <footer className="app__footer">
        <small>Double-click a todo to edit · Built with React 18 + Vite</small>
      </footer>
    </main>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
