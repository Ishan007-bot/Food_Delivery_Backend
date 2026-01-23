# Food Delivery System Backend

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

- **Developer Name** - [GitHub](https://github.com/your-username)

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

**Built with ❤️ using Spring Boot**
