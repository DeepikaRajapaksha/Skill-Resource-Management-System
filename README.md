# Skills Resource Management System

A full-stack web application for managing personnel, projects, skills, and assignments.  
Includes automated skill matching and project planning features.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router DOM
- TailwindCSS (optional)

### Backend
- Node.js
- Express.js
- MySQL Database
- Sequelize ORM
- Nodemon (development)

---

## 📌 Prerequisites

Install the following before running the system:

- **Node.js** v18 or above  
- **MySQL** v8 or above  
- **Git** (latest version)

---

## 📥 1. Clone the Repository

git clone https://github.com/DeepikaRajapaksha/Skill-Resource-Management-System.git

## ⚙️ 2. Backend Setup
- cd backend
- npm install

## 🗄 3. Create MySQL Database

Before creating the database, make sure your MySQL server is running.

▶ If you are using XAMPP

Start MySQL Module.

▶ If you are using WAMP

Start all services → ensure MySQL is running.

▶ If you are using MySQL Workbench / standalone MySQL

Make sure the MySQL Server Status = Running.

- Open MySQL and run:
- CREATE DATABASE skills_resource_mgmt;

## 📦 4. Run Migrations & Seeders

Inside the backend folder, run:

▶ Run all migrations
npx sequelize db:migrate

▶ Run all seeders
npx sequelize db:seed:all

If you need to undo:

- npx sequelize db:migrate:undo:all
- npx sequelize db:seed:undo:all

## 🔐 5. Configure Environment Variables

Create `.env` inside **backend/**:

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=
- DB_NAME=skills_resource_mgmt

- JWT_SECRET=your_jwt_secret_key
- PORT=5000


## ▶ 6. Run Backend
npm run dev

Backend will run on:
👉 **[http://localhost:5000](http://localhost:5000)**


## 🎨 7. Frontend Setup

Open a new terminal window:
- cd frontend
- npm install
- npm run dev

Frontend will run on:
👉 **[http://localhost:5173](http://localhost:5173)**

## 🔐 8. Login Credentials (Seeder Default)

If you used the provided seeders, the default login credentials are:

Admin Login

- Email: admin@example.com
- Password: 12345


# 📡 API Endpoints Documentation

## 🔐 Auth API

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get JWT token |

---

## 👤 Personnel API

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/personnel`     | Get all personnel |
| POST   | `/api/personnel`     | Create personnel  |
| PUT    | `/api/personnel/:id` | Update personnel  |
| DELETE | `/api/personnel/:id` | Delete personnel  |

---

## 📘 Skills API

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| GET    | `/api/skills` | Get skills    |
| POST   | `/api/skills` | Add new skill |

---

## 📁 Project API

| Method | Endpoint            | Description    |
| ------ | ------------------- | -------------- |
| GET    | `/api/projects`     | Get projects   |
| POST   | `/api/projects`     | Create project |
| PUT    | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

---

## 🧩 Project Required Skills API

| Method | Endpoint                         | Description                       |
| ------ | -------------------------------- | --------------------------------- |
| GET    | `/api/project-skills/:projectId` | Get required skills for a project |
| POST   | `/api/project-skills`            | Add required skill to project     |

---

## 🔗 Assignment API

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/assignments`     | Get all assignments |
| POST   | `/api/assignments`     | Assign skill/person |
| DELETE | `/api/assignments/:id` | Delete assignment   |

---

## ⭐ Features Implemented

* Personnel CRUD management
* Project CRUD with required skills
* Skill management system
* Assignment system connecting personnel + skills
* Skill matching algorithm:

  * Filters personnel by required skills
  * Checks proficiency
  * Shows match results
* REST API using Express.js
* Fully working React frontend
* Login / Authentication using JWT
