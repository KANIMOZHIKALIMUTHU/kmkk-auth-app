# Authentication App (Node.js + SQLite + React)

A full-stack authentication system built with SQLite, Express.js, and React.js.
Includes JWT authentication, protected routes, and a styled UI for Register, Login, and Dashboard.

## Project Structure
project-root/
│── backend/       # Express + SQLite + JWT API
│   ├── routes/    # API routes
│   ├── users.db   # SQLite database file
│   ├── db.js      # DB connection
│   ├── auth.js    # Auth routes (register/login)
│   └── server.js  # Express server
│
│── frontend/      # React app (Register, Login, Dashboard)
│   ├── src/components/
│   │   ├── Register/
│   │   ├── Login/
│   │   └── Dashboard/
│
│── package.json
│── README.md

## Features

1. User Registration & Login stored in SQLite

2. Protected Dashboard route

3. Styled Register/Login forms with responsive UI

4. Persistent authentication with cookies

5. Logout functionality

6. Active navbar highlighting using NavLink

## Tech Stack

Frontend: React.js, Axios, React Router DOM
Backend: Node.js, Express.js, JWT, SQLite3
Database: SQLite

## Installation & Setup
1. Clone the repository
git clone https://github.com/KANIMOZHIKALIMUTHU/kmkk-auth-app
cd auth-app

2. Setup Backend
cd backend
npm install


* Run backend:

node server.js


✅ This will create users.db automatically (if it doesn’t exist).

4. Setup Frontend
cd ../frontend
npm install


* Run frontend:

npm start

## Usage

1. Open http://localhost:3000 in your browser.

2. Register a new account (saved in users.db).

3. Login with the registered email & password.

4. Access the protected Dashboard.

5. Logout to end the session.