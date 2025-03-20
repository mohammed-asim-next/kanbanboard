# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Kanban Board

A **Kanban Board** application built using **React** to manage tasks efficiently with different statuses. This project includes a frontend for task management and a JSON server to store data.

## Features
- Add, edit, and delete tasks.
- Drag and drop tasks between different columns (To Do, In Progress, Done).
- Persistent data storage using `json-server`.

## Installation

Follow these steps to install and run the project on your local machine.

### 1. Clone the Repository
```sh
git clone https://github.com/mohammed-asim-next/kanbanboard.git
cd kanbanboard
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the React App
```sh
npm start
```
This will launch the application in your browser at `http://localhost:3000`.

## JSON Server Setup

The project uses `json-server` to store tasks. To set up and run the server:

### 1. Install JSON Server
```sh
npm install -g json-server
```

### 2. Start JSON Server
```sh
json-server --watch database/db.json --port 5000
```
This will start a server at `http://localhost:5000` where the tasks are stored.

## Usage
- Open `http://localhost:3000` in your browser.
- Add new tasks using the input field.
- Drag and drop tasks to different columns.
- Refreshing the page retains all changes as data is stored in `db.json`.

## Technologies Used
- React.js (Frontend)
- JSON Server (Backend)
- React DnD (Drag and Drop)

## Contributing
Feel free to fork the repository and submit a pull request with improvements.

---

Happy Coding! 🚀

