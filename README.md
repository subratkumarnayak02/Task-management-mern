# Task Management System

A full-stack task management application built with the MERN stack, featuring secure user authentication and complete task CRUD functionality.

## 🔗 Live Demo

- **Frontend:** [https://task-management-mern-khaki.vercel.app](https://task-management-mern-khaki.vercel.app/login)
- **Backend API:** [https://task-management-mern-v7pe.onrender.com](https://task-management-mern-v7pe.onrender.com)

> **Note:** The backend is hosted on Render's free tier, which spins down after periods of inactivity. The first request after idle time may take 30–50 seconds to respond while the server wakes up.

## 📋 Features

- **User Authentication**
  - Secure registration and login
  - Password hashing with bcrypt
  - JWT-based session management
  - Protected routes (redirects unauthenticated users to login)

- **Task Management**
  - Create, read, update, and delete tasks
  - Set task priority (Low / Medium / High)
  - Track task status (Pending / In Progress / Completed)
  - Optional due dates
  - Filter tasks by status
  - Quick status updates via dropdown
  - Real-time task statistics on dashboard

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 📁 Project Structure

```
task-management-mern/
├── server/                    # Backend
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── controllers/
│   │   ├── authController.js  # Register/Login logic
│   │   └── taskController.js  # Task CRUD logic
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── server.js              # Entry point
│   └── package.json
│
└── client/                    # Frontend
    ├── src/
    │   ├── pages/
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   ├── TaskForm.jsx
    │   │   └── TaskCard.jsx
    │   ├── services/
    │   │   └── api.js         # Axios instance + API calls
    │   └── App.jsx             # Routes
    ├── vercel.json             # SPA routing config
    └── package.json
```

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18 or higher)
- npm
- A MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-management-mern.git
cd task-management-mern
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint             | Description         | Protected |
|--------|-----------------------|----------------------|-----------|
| POST   | `/api/auth/register`  | Register new user   | No        |
| POST   | `/api/auth/login`     | Login user           | No        |

### Task Routes
| Method | Endpoint           | Description           | Protected |
|--------|--------------------|------------------------|-----------|
| POST   | `/api/tasks`       | Create a new task     | Yes       |
| GET    | `/api/tasks`       | Get all user's tasks  | Yes       |
| GET    | `/api/tasks/:id`   | Get a single task     | Yes       |
| PUT    | `/api/tasks/:id`   | Update a task         | Yes       |
| DELETE | `/api/tasks/:id`   | Delete a task         | Yes       |

> Protected routes require a JWT token in the request header:
> `Authorization: Bearer <token>`

## 🔐 Authentication Flow

1. User registers or logs in → receives a JWT token
2. Token is stored in browser `localStorage`
3. Token is automatically attached to all subsequent API requests via an Axios interceptor
4. Protected backend routes verify the token using middleware before processing requests
5. Protected frontend routes (like the Dashboard) check for a valid token and redirect to login if absent

## 📌 Future Improvements

- [ ] Task assignment to other users
- [ ] Drag-and-drop task board view
- [ ] Email notifications for due dates
- [ ] UI/UX polish and responsive design improvements
- [ ] Unit and integration tests

## 👤 Author

Built by Subrat as a learning project to practice full-stack development with the MERN stack.
