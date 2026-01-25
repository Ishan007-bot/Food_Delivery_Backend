# 🍔 Food Delivery System

A production-grade full-stack food delivery platform with Spring Boot backend and React frontend.

## 📁 Project Structure

```
Food_Delivery_Backend/
├── backend/          # Spring Boot Backend
│   ├── src/          # Source code
│   ├── pom.xml       # Maven configuration
│   ├── mvnw          # Maven wrapper
│   └── .mvn/         # Maven wrapper files
├── frontend/         # React Frontend
│   ├── src/          # Source code
│   ├── package.json  # NPM dependencies
│   └── vite.config.ts # Vite configuration
└── README.md         # This file
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs on: `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 📚 Documentation

- [Backend README](backend/README.md) - Backend setup and API documentation
- [Frontend README](frontend/README.md) - Frontend setup and development guide

## ✨ Features

### Backend
- 🔐 JWT Authentication & Authorization
- 🏪 Restaurant & Menu Management
- 📦 Order Processing
- 💳 Payment Integration
- 📊 Analytics & Reporting
- ⚡ Caching & Performance
- 🛡️ Security & Rate Limiting

### Frontend
- 🎨 Modern React UI
- 🔐 User Authentication
- 🛒 Shopping Cart
- 📱 Responsive Design
- 📊 Analytics Dashboard

## 🛠️ Tech Stack

**Backend:**
- Spring Boot 3.2.1
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui

## 📝 License

MIT
