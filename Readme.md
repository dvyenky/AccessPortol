Access Portal (Full Stack Project)

A modern Access Request Management System built using React (Frontend), FastAPI (Backend), and PostgreSQL (Database).
Employees can request system access and admins can approve or reject requests. The system also includes a dashboard for request analytics.

Features
User Side
Login authentication
Create access requests
View own request status
Filter and search requests
Admin Side
View all user requests
Approve or reject requests
Add admin remarks
Analytics dashboard (Pending, Approved, Rejected requests)
Tech Stack
Frontend
React.js
Material UI
Axios
Backend
FastAPI
SQLAlchemy
Pydantic
Uvicorn
Database
PostgreSQL
Project Setup Instructions
Backend Setup
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Run backend server:

uvicorn app.main:app --reload

Database Setup (PostgreSQL)

Create database:
CREATE DATABASE access_portal;
Environment Configuration

Create or update .env file inside the Backend folder:

DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/access_portal

Frontend Setup
cd Frontend
npm install
npm start

Dashboard
Pending Requests Count
Approved Requests Count
Rejected Requests Count

(Values should be dynamically fetched from backend API)

Notes
node_modules is excluded from repository
.env file is not committed for security reasons
Database must be created manually before running backend
Backend must be started before frontend API calls work correctly

Project Structure
AccessPortal/
│
├── Backend/
│   ├── app/
│   ├── venv/
│   ├── requirements.txt
│   └── main.py
│
├── Frontend/
│   ├── src/
│   ├── package.json
│   └── public/
