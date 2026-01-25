# 🍔 Food Delivery System Backend

A production-grade RESTful API backend for a comprehensive food delivery platform built with Spring Boot 3.2.1 and Java 21.

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Testing](#-testing)
- [Deployment](#-deployment)

---

## ✨ Features

### Core Functionality
- **🔐 Authentication & Authorization**: JWT-based secure authentication with role-based access control (RBAC)
- **👥 User Management**: Complete CRUD operations with profile management and soft delete
- **🏪 Restaurant Management**: Full restaurant lifecycle with location-based search using Haversine formula
- **🍕 Menu & Food Items**: Comprehensive menu management with categories and dietary tags
- **📦 Order Management**: End-to-end order processing with real-time status tracking
- **💳 Payment Integration**: Secure payment processing with Razorpay integration (mock)
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

### Frontend (Bonus)
- **⚛️ React Frontend**: Modern React 19 + TypeScript + Vite frontend application
- **🎨 Modern UI**: Clean, responsive design with intuitive user experience
- **🛒 Shopping Cart**: Full cart functionality with quantity management
- **📱 Responsive Design**: Mobile-friendly interface

---

## 🛠 Tech Stack

### Backend Framework
- **Spring Boot 3.2.1** - Application framework
- **Spring Data JPA** - Data persistence
- **Spring Security** - Authentication & authorization
- **Spring Mail** - Email notifications
- **Spring Cache** - Caching abstraction

### Database
- **PostgreSQL** - Primary database
- **Hibernate** - ORM framework

### Security
- **JWT (JJWT 0.12.3)** - Token-based authentication
- **BCrypt** - Password encryption

### Documentation
- **Springdoc OpenAPI 3** - API documentation
- **Swagger UI** - Interactive API explorer

### Utilities
- **Lombok** - Boilerplate reduction
- **Caffeine** - High-performance caching
- **Commons IO** - File operations

---

## 🏗 Architecture

### Layered Architecture
```
┌─────────────────────────────────────┐
│         Controllers                 │  ← REST API Endpoints
├─────────────────────────────────────┤
│         Services                    │  ← Business Logic
├─────────────────────────────────────┤
│         Repositories                │  ← Data Access Layer
├─────────────────────────────────────┤
│         Entities/Models             │  ← Domain Models
└─────────────────────────────────────┘
```

### Package Structure
```
com.backend.fooddelivery
├── config/              # Configuration classes
├── controller/          # REST controllers (10)
├── dto/                 # Data Transfer Objects
│   ├── request/        # Request DTOs (10)
│   └── response/       # Response DTOs (5)
├── exception/          # Exception handling
├── model/              # JPA entities (8)
├── repository/         # Data repositories (8)
├── security/           # Security components
├── service/            # Business logic (10)
└── util/               # Utility classes (4 mappers)
```

---

## 🚀 Getting Started

### Prerequisites
- **Java 21** or higher
- **Maven 3.6+**
- **PostgreSQL 12+**
- **Node.js 18+** (for frontend)
- **Git**

### Backend Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ishan007-bot/Food_Delivery_Backend.git
cd Food_Delivery_Backend
```

2. **Configure Database**

Create a PostgreSQL database:
```sql
CREATE DATABASE food_delivery_db;
```

3. **Configure Environment Variables**

Update `src/main/resources/application.yaml` or set environment variables:
```properties
# Database
DB_URL=jdbc:postgresql://localhost:5432/food_delivery_db
DB_USERNAME=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-secret-key-min-256-bits
JWT_EXPIRATION=86400000

# Email (Optional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

4. **Build the project**
```bash
./mvnw clean install
```

5. **Run the application**
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Update `.env` file** (if backend URL is different)
```
VITE_API_BASE_URL=http://localhost:8080/api
```

5. **Start development server**
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 📚 API Documentation

### Swagger UI
Access interactive API documentation at:
```
http://localhost:8080/swagger-ui.html
```

### API Endpoints Overview

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

#### Users
- `GET /api/users` - List all users (Admin)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user (soft delete)
- `POST /api/users/{id}/profile-picture` - Upload profile picture

#### Restaurants
- `GET /api/restaurants` - List restaurants (with pagination, sorting, filtering)
- `GET /api/restaurants/{id}` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (Admin/Owner)
- `PUT /api/restaurants/{id}` - Update restaurant
- `DELETE /api/restaurants/{id}` - Delete restaurant
- `GET /api/restaurants/search/location` - Location-based search
- `POST /api/restaurants/{id}/logo` - Upload restaurant logo

#### Menu Items
- `GET /api/menu-items/restaurant/{restaurantId}` - Get menu by restaurant
- `GET /api/menu-items/{id}` - Get menu item details
- `POST /api/menu-items` - Create menu item (Restaurant Owner)
- `PUT /api/menu-items/{id}` - Update menu item
- `DELETE /api/menu-items/{id}` - Delete menu item
- `POST /api/menu-items/{id}/image` - Upload food image

#### Orders
- `POST /api/orders` - Place new order
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders/customer/{customerId}` - Customer order history
- `GET /api/orders/restaurant/{restaurantId}` - Restaurant orders
- `PUT /api/orders/{id}/status` - Update order status
- `PUT /api/orders/{id}/cancel` - Cancel order

#### Payments
- `POST /api/payments/process` - Process payment
- `PUT /api/payments/{id}/verify` - Verify payment
- `PUT /api/payments/{id}/status` - Update payment status

#### Deliveries
- `POST /api/deliveries/assign` - Assign delivery partner
- `PUT /api/deliveries/{id}/pickup` - Mark as picked up
- `PUT /api/deliveries/{id}/deliver` - Mark as delivered
- `GET /api/deliveries/partner/{partnerId}` - Get partner deliveries

#### Reviews
- `POST /api/reviews` - Submit review
- `GET /api/reviews/restaurant/{restaurantId}` - Get restaurant reviews

#### Analytics
- `GET /api/analytics/restaurant/{restaurantId}` - Restaurant analytics
- `GET /api/analytics/system` - System-wide analytics

---

## 🗄 Database Schema

### Core Entities

**User**
- Roles: ADMIN, CUSTOMER, RESTAURANT_OWNER, DELIVERY_PARTNER
- Soft delete support
- Profile management

**Restaurant**
- Location-based search (latitude/longitude)
- Operating hours
- Cuisine types
- Rating aggregation

**MenuItem**
- 7 Categories: APPETIZER, MAIN_COURSE, DESSERT, BEVERAGE, SNACK, SALAD, SOUP
- 7 Dietary Tags: VEGETARIAN, VEGAN, GLUTEN_FREE, DAIRY_FREE, NUT_FREE, HALAL, KOSHER
- Popularity tracking

**Order**
- 7 Statuses: PENDING, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED, REFUNDED
- Price snapshots for historical accuracy

**Payment**
- Methods: CARD, UPI, CASH, WALLET
- Statuses: PENDING, SUCCESS, FAILED, REFUNDED

**Delivery**
- Statuses: ASSIGNED, PICKED_UP, DELIVERED
- Timestamp tracking

**Review**
- Rating (1-5 stars)
- Restaurant rating updates

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

### Best Practices
- **Input Validation**: Jakarta Validation on all DTOs
- **SQL Injection Prevention**: JPA/Hibernate parameterized queries
- **CORS Configuration**: Controlled cross-origin requests
- **Rate Limiting**: API request throttling for abuse prevention

---

## 🧪 Testing

### Run Tests
```bash
./mvnw test
```

### Test Coverage
- Unit tests for services
- Integration tests for repositories
- Security tests for authentication

---

## 🚢 Deployment

### Build Production JAR
```bash
./mvnw clean package -DskipTests
```

### Run Production Build
```bash
java -jar target/food-delivery-service-0.0.1-SNAPSHOT.jar
```

### Docker Deployment (Optional)
```dockerfile
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Environment Profiles
- **Development**: `spring.profiles.active=dev`
- **Production**: `spring.profiles.active=prod`

---

## 📊 Project Statistics

- **Total Java Files**: 67
- **Controllers**: 10
- **Services**: 10
- **Entities**: 8
- **Repositories**: 8
- **DTOs**: 15
- **API Endpoints**: 35+
- **Lines of Code**: 5000+

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
- Email: ishanganguly10a12@gmail.com

---

## 🙏 Acknowledgments

- Spring Boot Team for the excellent framework
- PostgreSQL Community
- All contributors and supporters

---

## 📞 Support

For support, email ishanganguly10a12@gmail.com or open an issue in the repository.

---

**⭐ Star this repository if you find it helpful!**


[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Project Overview

A **production-grade** Food Delivery System backend built with Spring Boot, featuring secure authentication, role-based access control, real-time order tracking, payment integration, and comprehensive analytics.

### Key Features

✅ **Authentication & Authorization** - JWT-based with role-based access control  
✅ **User Management** - Multi-role support (Admin, Customer, Restaurant Owner, Delivery Partner)  
✅ **Restaurant Management** - Location-based search, filtering, and sorting  
✅ **Menu Management** - Categories, dietary tags, and availability tracking  
✅ **Order Management** - Complete lifecycle from placement to delivery  
✅ **Payment Integration** - Razorpay/Stripe integration  
✅ **Delivery Tracking** - Real-time status updates  
✅ **Reviews & Ratings** - Customer feedback system  
✅ **Advanced Features** - Caching, rate limiting, email notifications  
✅ **Analytics APIs** - Revenue, orders, and performance metrics  
✅ **API Documentation** - Interactive Swagger UI  

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Framework** | Spring Boot 3.2.1 |
| **Language** | Java 21 |
| **Database** | PostgreSQL |
| **Authentication** | JWT (jjwt 0.12.3) |
| **API Documentation** | Springdoc OpenAPI 3 |
| **Caching** | Caffeine |
| **Email** | Spring Mail (SMTP) |
| **Rate Limiting** | Bucket4j |
| **Build Tool** | Maven |
| **Testing** | JUnit 5, Mockito |

---

## 📁 Project Structure

```
src/main/java/com/backend/fooddelivery/
├── controller/          # REST API controllers
├── service/             # Business logic layer
├── repository/          # Data access layer
├── model/               # Entity classes
├── dto/                 # Data Transfer Objects
│   ├── request/         # Request DTOs
│   └── response/        # Response DTOs
├── config/              # Configuration classes
├── security/            # Security & JWT components
├── exception/           # Custom exceptions & handlers
└── util/                # Utility classes

src/main/resources/
├── application.yaml     # Application configuration
└── static/              # Static resources

uploads/                 # File upload directory
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 21** or higher
- **Maven 3.8+**
- **PostgreSQL 15+**
- **Git**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/food-delivery-service.git
   cd food-delivery-service
   ```

2. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE food_delivery_db;
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual configuration
   ```

4. **Update application.yaml** (or use environment variables)
   - Database credentials
   - JWT secret key
   - Email SMTP settings

5. **Build the project**
   ```bash
   mvn clean install
   ```

6. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

---

## 📚 API Documentation

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

---

## 🔑 Environment Variables

Create a `.env` file or set environment variables:

```env
# Database
DB_URL=jdbc:postgresql://localhost:5432/food_delivery_db
DB_USERNAME=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits
JWT_EXPIRATION=86400000

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Server
SERVER_PORT=8080
SPRING_PROFILE=dev
```

See `.env.example` for all available configuration options.

---

## 🔐 User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **ADMIN** | System administrator | Full system access, manage all entities |
| **RESTAURANT_OWNER** | Restaurant manager | Manage own restaurant, menu, orders |
| **CUSTOMER** | End user | Browse, order, track deliveries, reviews |
| **DELIVERY_PARTNER** | Delivery personnel | Accept deliveries, update status |

---

## 📊 Core Entities

- **User** - Authentication and user profiles
- **Restaurant** - Restaurant information and management
- **MenuItem** - Food items and menu management
- **Order** - Order processing and tracking
- **OrderItem** - Individual items in an order
- **Payment** - Payment transactions
- **Delivery** - Delivery tracking and management
- **Review** - Customer reviews and ratings

---

## 🧪 Testing

Run tests with:

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=AuthControllerTest

# Run with coverage
mvn clean test jacoco:report
```

---

## 📦 Build & Deployment

### Build JAR

```bash
mvn clean package
```

The JAR file will be created in `target/food-delivery-service-0.0.1-SNAPSHOT.jar`

### Run JAR

```bash
java -jar target/food-delivery-service-0.0.1-SNAPSHOT.jar
```

### Docker (Optional)

```bash
# Build image
docker build -t food-delivery-system .

# Run container
docker run -p 8080:8080 food-delivery-system
```

---

## 🔧 Development Workflow

### Phase 1: Setup ✅
- Project initialization
- Dependencies configuration
- Database setup

### Phase 2: Authentication (In Progress)
- JWT implementation
- User registration/login
- Role-based access control

### Phase 3-10: Feature Development
See `implementation-plan.md` for detailed phase breakdown.

---

## 📝 API Endpoints (Preview)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh JWT token

### Restaurants
- `GET /api/restaurants` - List restaurants (paginated, filtered)
- `GET /api/restaurants/{id}` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (Admin/Owner)

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders/{id}` - Get order details
- `PUT /api/orders/{id}/status` - Update order status

### Analytics
- `GET /api/analytics/revenue` - Revenue analytics
- `GET /api/analytics/orders/count` - Order statistics

*Full API documentation available in Swagger UI*

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Ishan Ganguly 24BCS10330** - [GitHub](https://github.com/Ishan007-bot)

---

## 📞 Support

For support, email support@fooddelivery.com or open an issue in the repository.

---

## 🎯 Project Status

**Current Phase**: Phase 1 - Project Setup & Foundation ✅

**Next Steps**:
- [ ] Implement JWT authentication
- [ ] Create user management APIs
- [ ] Build restaurant management system

---

## 🔗 Related Documentation

- [Requirements Document](docs/requirements.md)
- [Implementation Plan](docs/implementation-plan.md)
- [API Documentation](http://localhost:8080/swagger-ui.html)

---

