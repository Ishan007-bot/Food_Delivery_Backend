# 🍔 Food Delivery System

A production-grade full-stack food delivery platform with Spring Boot backend and React frontend.

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
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
  - 4 User Roles: ADMIN, CUSTOMER, RESTAURANT_OWNER, DELIVERY_PARTNER
  - Secure password hashing with BCrypt
  - Token-based stateless authentication

- **👥 User Management**: Complete CRUD operations with profile management and soft delete
  - User registration and login
  - Profile picture upload
  - Role-based permissions

- **🏪 Restaurant Management**: Full restaurant lifecycle with advanced search capabilities
  - Location-based search using Haversine formula
  - Filter by cuisine, rating, price range, vegetarian options
  - Restaurant logo upload
  - Opening/closing hours management

- **🍕 Menu & Food Items**: Comprehensive menu management
  - Categories: Appetizer, Main Course, Dessert, Beverage, Snack, Salad, Soup
  - Dietary tags: VEG, NON_VEG, VEGAN, GLUTEN_FREE, DAIRY_FREE, KETO, HALAL
  - Menu item images
  - Availability toggle

- **📦 Order Management**: End-to-end order processing
  - Real-time status tracking (PLACED, CONFIRMED, PREPARING, READY_FOR_PICKUP, OUT_FOR_DELIVERY, DELIVERED)
  - Order history with pagination
  - Order cancellation
  - Restaurant-specific order views

- **💳 Payment Integration**: Secure payment processing with Razorpay
  - Multiple payment methods (UPI, Card, Cash on Delivery)
  - Payment verification
  - Transaction tracking

- **🚚 Delivery Tracking**: Real-time delivery assignment and status updates
  - Delivery partner assignment
  - Status updates
  - Delivery completion tracking

- **⭐ Reviews & Ratings**: Customer feedback system
  - Rating aggregation
  - Review management
  - Average rating calculation

- **📧 Email Notifications**: Automated email system
  - Order confirmation emails
  - Delivery notifications
  - SMTP integration

- **📊 Analytics Dashboard**: Business intelligence APIs
  - Restaurant revenue tracking
  - Order statistics by status
  - System-wide analytics
  - Rating analytics

### Advanced Features (11/11 Complete)

- **🗺️ Location-Based Search**: Find restaurants within radius using Haversine formula
- **⚡ Caching**: High-performance caching with Caffeine
  - `@Cacheable` on frequently accessed methods
  - `@CacheEvict` for cache consistency
  - 10-minute expiration, 1000 entry limit
- **🛡️ Rate Limiting**: API rate limiting with Bucket4j
  - Login rate limit: 5 requests/minute
  - Order rate limit: 10 requests/minute
  - General rate limit: 100 requests/minute
- **📝 Input Validation**: Comprehensive request validation with Jakarta Validation
- **🔄 Soft Delete**: Data integrity with soft delete mechanism
- **📄 API Documentation**: Interactive Swagger/OpenAPI documentation
- **🎯 Global Exception Handling**: Centralized error handling with meaningful responses
- **🔍 Complex Queries**: Custom repository methods for analytics and reporting
- **📄 Pagination & Sorting**: All list endpoints support pagination
- **🎨 Filtering**: Advanced filtering by multiple criteria
- **📁 File Upload**: Support for images (logos, menu items, profile pictures)

### Frontend

- **⚛️ React Frontend**: Modern React 18 + TypeScript + Vite
- **🎨 Modern UI**: shadcn-ui components with Tailwind CSS
- **🌙 Theme Support**: Dark/Light mode
- **🛒 Shopping Cart**: Full cart functionality
- **📱 Responsive Design**: Mobile-friendly interface
- **🔐 Protected Routes**: Authentication-based routing
- **📊 Dashboard**: Analytics and management interface

---

## 🛠️ Tech Stack

### Backend

| Component             | Technology          | Purpose |
| --------------------- | ------------------- | ------- |
| **Framework**         | Spring Boot 3.2.1   | Core framework |
| **Language**          | Java 21             | Programming language |
| **Database**          | PostgreSQL          | Production database |
| **Test Database**     | H2                  | In-memory testing |
| **Authentication**    | JWT (jjwt 0.12.3)   | Token-based auth |
| **API Documentation** | Springdoc OpenAPI 3 | Interactive API docs |
| **Caching**           | Caffeine            | High-performance cache |
| **Email**             | Spring Mail (SMTP)  | Email notifications |
| **Rate Limiting**     | Bucket4j 7.6.0      | API rate limiting |
| **Payment**           | Razorpay            | Payment gateway |
| **Build Tool**        | Maven               | Dependency management |
| **Testing**           | JUnit 5, Mockito    | Unit testing |

### Frontend

| Component             | Technology          |
| --------------------- | ------------------- |
| **Framework**         | React 18            |
| **Language**          | TypeScript          |
| **Build Tool**        | Vite                |
| **Styling**           | Tailwind CSS        |
| **UI Components**     | shadcn-ui           |
| **State Management**  | React Query         |
| **HTTP Client**       | Axios               |
| **Routing**           | React Router v6     |
| **Animations**        | Framer Motion       |

---

## 📚 Documentation

- [Backend README](backend/README.md) - Backend setup and API documentation
- [Frontend README](frontend/README.md) - Frontend setup and development guide
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI Docs**: `http://localhost:8080/v3/api-docs`

---

## 🔒 Security

### Authentication

- **JWT Tokens**: Stateless authentication with secure token generation
- **Password Encryption**: BCrypt hashing for all passwords
- **Token Expiration**: 24 hours (configurable)
- **Refresh Tokens**: 7 days validity

### Authorization

- **Role-Based Access Control (RBAC)**: Fine-grained permissions
- **Method-Level Security**: `@PreAuthorize` annotations
- **Endpoint Protection**: Secured REST endpoints
- **Rate Limiting**: Protection against abuse

### Best Practices

- No hardcoded credentials (environment variables)
- CORS configuration
- Input validation on all endpoints
- Global exception handling
- Secure file upload validation

---

## 🏗️ Architecture

### Layered Architecture

```
Controller Layer (REST APIs)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Data Access)
    ↓
Database (PostgreSQL)
```

### Key Components

- **Controllers** (11): REST endpoints for all features
- **Services** (11): Business logic implementation
- **Repositories** (8): JPA data access
- **Models** (8): JPA entities
- **DTOs**: Request/Response objects
- **Config** (5): Security, Cache, Rate Limit, Swagger, WebMvc
- **Exception Handling**: Global exception handler
- **Security**: JWT authentication filter

---

## 🧪 Testing

### Run Tests

```bash
cd backend
./mvnw test
```

### Test Coverage

- Unit tests with JUnit 5
- Mock testing with Mockito
- H2 in-memory database for testing

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

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
DB_URL=jdbc:postgresql://localhost:5432/food_delivery_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user
- `POST /api/users/me/profile-picture` - Upload profile picture

### Restaurants
- `GET /api/restaurants` - Get all restaurants (paginated)
- `GET /api/restaurants/{id}` - Get restaurant by ID
- `GET /api/restaurants/search` - Search restaurants
- `GET /api/restaurants/nearby` - Location-based search
- `POST /api/restaurants` - Create restaurant
- `PUT /api/restaurants/{id}` - Update restaurant
- `DELETE /api/restaurants/{id}` - Delete restaurant

### Menu Items
- `GET /api/menu-items/restaurant/{restaurantId}` - Get restaurant menu
- `GET /api/menu-items/{id}` - Get menu item
- `POST /api/menu-items/restaurant/{restaurantId}` - Create menu item
- `PUT /api/menu-items/{id}` - Update menu item
- `DELETE /api/menu-items/{id}` - Delete menu item

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders/my-orders` - Get customer orders
- `PATCH /api/orders/{id}/status` - Update order status
- `PATCH /api/orders/{id}/cancel` - Cancel order

### Payments
- `POST /api/payments` - Process payment
- `POST /api/payments/verify` - Verify Razorpay payment

### Analytics
- `GET /api/analytics/restaurant/{id}` - Restaurant analytics
- `GET /api/analytics/system` - System-wide analytics

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/restaurant/{id}` - Get restaurant reviews

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

## 🎓 Academic Project

This project was developed as part of a Spring Boot backend development assignment, demonstrating:

- ✅ Production-grade backend architecture
- ✅ RESTful API design
- ✅ Security best practices
- ✅ Database modeling
- ✅ External integrations
- ✅ Performance optimization
- ✅ Complete documentation

---

**⭐ Star this repository if you find it helpful!**
