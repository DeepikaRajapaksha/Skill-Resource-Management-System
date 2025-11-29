# 📘 **Skills & Resource Management System**

*A Full-Stack Intern Project – Personnel, Skills & Project Matching Platform*

---

## 📝 **Project Description**

The **Skills & Resource Management System** is a full-stack application built to help small consultancies or tech agencies manage their personnel, track skills, manage projects, and automatically match the right people to project requirements.

The system supports:

* Personnel Management (CRUD)
* Skill Management (CRUD + Skill Assignment to Users)
* Project Management (CRUD + Required Skills)
* A Matching Algorithm to suggest best-suited personnel for projects

---

# 🛠️ **Technology Stack**

### **Frontend**

* React.js (Vite + Hooks)
* React Router DOM
* Axios

### **Backend**

* Node.js
* Express.js
* MySQL2
* Nodemon
* Dotenv

### **Database**

* MySQL (Version 8+ recommended)

---

# 📌 **Prerequisites**

Ensure the following are installed on your system:

| Requirement | Version |
| ----------- | ------- |
| Node.js     | v18+    |
| npm         | v9+     |
| MySQL       | v8+     |
| Git         | Latest  |

---

# 🚀 **Step-by-Step Setup Instructions**

## 📥 **1. Clone the Repository**

git clone [https://github.com/yourusername/skills-resource-management-system.git](https://github.com/DeepikaRajapaksha/Skill-Resource-Management-System.git) 
cd skills-resource-management-system

---

# 🖥️ **Backend Setup**

## 📂 **2. Navigate to Backend Folder**

cd backend

## 📦 **3. Install Dependencies**

npm install

---

## 🗄️ **4. Set Up MySQL Database**

### ✔ Create Database

Open MySQL CLI or phpMyAdmin and run:

CREATE DATABASE skills_db;


### ✔ Import Schema File

mysql -u root -p skills_db < schema.sql

*(your schema.sql must be placed inside backend folder)*

---

## 🔐 **5. Configure Environment Variables**

Create a `.env` file inside **backend/**:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=skills_db
PORT=5000


---

## ▶️ **6. Run the Backend**
npm run dev

Backend runs at:

👉 **[http://localhost:5000](http://localhost:5000)**

---

# 🖥️ **Frontend Setup**

## 📂 **1. Navigate to Frontend Folder**

cd ../frontend

## 📦 **2. Install Dependencies**
npm install

## ▶️ **3. Run the Frontend**
npm run dev

Frontend runs at:

👉 **[http://localhost:5173](http://localhost:5173)**

---

# 🔌 **API Endpoint Documentation**

### 🧑‍💼 **Personnel Endpoints**

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/personnel`     | Create personnel     |
| GET    | `/api/personnel`     | Get all personnel    |
| GET    | `/api/personnel/:id` | Get single personnel |
| PUT    | `/api/personnel/:id` | Update personnel     |
| DELETE | `/api/personnel/:id` | Delete personnel     |

---

### 🧠 **Skills Endpoints**

| Method | Endpoint          | Description  |
| ------ | ----------------- | ------------ |
| POST   | `/api/skills`     | Create skill |
| GET    | `/api/skills`     | List skills  |
| GET    | `/api/skills/:id` | Get skill    |
| PUT    | `/api/skills/:id` | Update skill |
| DELETE | `/api/skills/:id` | Delete skill |

---

### 🔗 **Assign Skill to Personnel**

| Method | Endpoint                    | Description                     |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/api/personnel/:id/skills` | Assign skill to given personnel |

---

### 📁 **Project Endpoints**

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/api/projects`     | Create project     |
| GET    | `/api/projects`     | List projects      |
| GET    | `/api/projects/:id` | Get single project |

---

### 🎯 **Matching Algorithm Endpoint**

| Method | Endpoint                  | Description                         |
| ------ | ------------------------- | ----------------------------------- |
| GET    | `/api/projects/:id/match` | Get matched personnel for a project |

---

# ✨ **Features Implemented**

### **1. Personnel Management**

* Full CRUD operations
* Experience levels: Junior, Mid-Level, Senior
* Validation (name, email, role)

### **2. Skills Management**

* Skill catalog CRUD
* Categories (Framework, Tool, Language, Soft Skill)
* Assign multiple skills to a personnel
* Proficiency: 1–5 scale

### **3. Project Management**

* Project creation
* Required skills + minimum proficiency level
* Project statuses: Planning, Active, Completed

### **4. Matching Algorithm**

* Matches personnel who meet all required skills
* Checks proficiency levels
* Sorted match score (optional)

### **5. Additional Creative Feature**

### ⭐ **Advanced Personnel Search & Filtering**

Allows filtering by:

* Role
* Skill
* Proficiency
* Experience level

This improves real-world usability and resource planning accuracy.

---

# 🖼️ **Screenshots**


# 📚 **Summary**

This project demonstrates full-stack development skills including:

* Backend REST API design
* Database modeling
* React UI implementation
* Algorithm design (skill matching)
* Advanced search filtering logic
* API testing & documentation
* Proper project structuring and environment setup

---


