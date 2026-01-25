# 🍔 Food Delivery System

A production-grade full-stack food delivery platform with Spring Boot backend and React frontend.

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

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

---

## ✨ Features

### Core Functionality

- **🔐 Authentication & Authorization**: JWT-based secure authentication with role-based access control (RBAC)
- **👥 User Management**: Complete CRUD operations with profile management and soft delete
- **🏪 Restaurant Management**: Full restaurant lifecycle with location-based search using Haversine formula
- **🍕 Menu & Food Items**: Comprehensive menu management with categories and dietary tags
- **📦 Order Management**: End-to-end order processing with real-time status tracking
- **💳 Payment Integration**: Secure payment processing with Razorpay integration
- **🚚 Delivery Tracking**: Real-time delivery assignment and status updates
- **⭐ Reviews & Ratings**: Customer feedback system with rating aggregation
- **📧 Email Notifications**: Automated order confirmations and status updates
- **📊 Analytics Dashboard**: Business intelligence with revenue and performance metrics

### Advanced Features

- **🗺️ Location-Based Search**: Find restaurants within radius using Haversine formula
- **⚡ Caching**: High-performance caching with Caffeine for frequently accessed data
- **🛡️ Rate Limiting**: API rate limiting with Bucket4j for enhanced security and stability
- **📝 Input Validation**: Comprehensive request validation with Jakarta Validation
- **🔄 Soft Delete**: Data integrity with soft delete mechanism
- **📄 API Documentation**: Interactive Swagger/OpenAPI documentation
- **🎯 Global Exception Handling**: Centralized error handling with meaningful responses

### Frontend

- **⚛️ React Frontend**: Modern React 19 + TypeScript + Vite frontend application
- **🎨 Modern UI**: Clean, responsive design with intuitive user experience
- **🛒 Shopping Cart**: Full cart functionality with quantity management
- **📱 Responsive Design**: Mobile-friendly interface

---

## 🛠️ Tech Stack

### Backend

| Component             | Technology          |
| --------------------- | ------------------- |
| **Framework**         | Spring Boot 3.2.1   |
| **Language**          | Java 21             |
| **Database**          | PostgreSQL          |
| **Authentication**    | JWT (jjwt 0.12.3)   |
| **API Documentation** | Springdoc OpenAPI 3 |
| **Caching**           | Caffeine            |
| **Email**             | Spring Mail (SMTP)  |
| **Rate Limiting**     | Bucket4j            |
| **Build Tool**        | Maven               |
| **Testing**           | JUnit 5, Mockito    |

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui

---

## 📚 Documentation

- [Backend README](backend/README.md) - Backend setup and API documentation
- [Frontend README](frontend/README.md) - Frontend setup and development guide
- Swagger UI: `http://localhost:8080/swagger-ui.html`

---

## 🔒 Security

### Authentication

- **JWT Tokens**: Stateless authentication with secure token generation
- **Password Encryption**: BCrypt hashing for all passwords
- **Token Expiration**: Configurable token validity period

### Authorization

- **Role-Based Access Control (RBAC)**: Fine-grained permissions
- **Method-Level Security**: `@PreAuthorize` annotations
- **Endpoint Protection**: Secured REST endpoints

---

## 🧪 Testing

### Run Tests

```bash
cd backend
./mvnw test
```

---

## 🚢 Deployment

### Build Production JAR

```bash
cd backend
./mvnw clean package -DskipTests
```

### Run Production Build

```bash
java -jar target/food-delivery-service-0.0.1-SNAPSHOT.jar
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ishan Ganguly**

- GitHub: [@Ishan007-bot](https://github.com/Ishan007-bot)

---

**⭐ Star this repository if you find it helpful!**
