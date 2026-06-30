# React Todo

> Todo app rebuilt in React 18 + Vite. Demonstrates components, hooks (`useState`, `useEffect`, `useReducer`, `useContext`), and modern React patterns.

![CI](https://github.com/arjundroid12/react-todo/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-18-blue)

## ✨ Features

- **React 18 + Vite** — modern build tooling, fast refresh
- **Hooks used:**
  - `useState` — local component state (input, filter, editing)
  - `useReducer` — todo list state with action dispatch pattern
  - `useEffect` — localStorage persistence
  - `useContext` — theme provider accessible from any component
- **Inline editing** — double-click any todo to edit
- **Filters** — All / Active / Done with live counts
- **Clear done** — bulk delete completed todos
- **Dark / light theme** via Context API
- **localStorage persistence**

## 🚀 Live Demo

| Host | URL | Notes |
|------|-----|-------|
| 🥇 Surge.sh | https://arjun-react-todo.surge.sh | Bangalore edge — best for India |
| 🥈 GitHub Pages | https://arjundroid12.github.io/react-todo/ | May be blocked by some Indian ISPs |

## 📦 Run Locally

```bash
git clone https://github.com/arjundroid12/react-todo.git
cd react-todo
npm install
npm run dev
# Visit http://localhost:5173
```

## 🛠️ Build for Production

```bash
npm run build      # outputs to dist/
npm run preview    # preview production build
```

## 📁 Project Structure

```
react-todo/
├── .github/workflows/ci.yml
├── src/
│   ├── App.jsx          # Main app + components + reducer + context
│   ├── main.jsx         # React root
│   └── styles.css       # All styles
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 📄 License

MIT © Arjun Vashishtha
