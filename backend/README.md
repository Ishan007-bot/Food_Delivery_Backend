# Food Delivery System - Backend

Production-grade Spring Boot backend for the Food Delivery System with comprehensive features including authentication, caching, rate limiting, and payment integration.

## 🚀 Quick Start

### Prerequisites
- Java 21
- Maven 3.6+
- PostgreSQL 12+ (or use H2 for testing)

### Running the Application

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Configure Database:**
```sql
CREATE DATABASE food_delivery_db;
```

3. **Set Environment Variables:**

Copy `.env.example` to `.env` and update:
```env
DB_URL=jdbc:postgresql://localhost:5432/food_delivery_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key-minimum-256-bits
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

4. **Run the application:**
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

---

## 📚 API Documentation

Once running, access:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/backend/fooddelivery/
│   │   │   ├── config/          # Configuration classes (5)
│   │   │   │   ├── CacheConfig.java
│   │   │   │   ├── RateLimitConfig.java
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── SwaggerConfig.java
│   │   │   │   └── WebMvcConfig.java
│   │   │   ├── controller/      # REST controllers (11)
│   │   │   │   ├── AnalyticsController.java
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── DeliveryController.java
│   │   │   │   ├── FileController.java
│   │   │   │   ├── HealthController.java
│   │   │   │   ├── MenuItemController.java
│   │   │   │   ├── OrderController.java
│   │   │   │   ├── PaymentController.java
│   │   │   │   ├── RestaurantController.java
│   │   │   │   ├── ReviewController.java
│   │   │   │   └── UserController.java
│   │   │   ├── service/         # Business logic (11)
│   │   │   ├── repository/      # Data access (8)
│   │   │   ├── model/           # JPA Entities (8)
│   │   │   ├── dto/             # Request/Response DTOs
│   │   │   ├── security/        # JWT & Security (3)
│   │   │   ├── exception/       # Exception handling (4)
│   │   │   └── util/            # Utilities (5)
│   │   └── resources/
│   │       └── application.yaml # Configuration
│   └── test/                    # Tests
├── pom.xml                      # Maven dependencies
└── mvnw                         # Maven wrapper
```

---

## ✨ Features

### Core Features

✅ **Authentication & Authorization**
- JWT-based authentication
- 4 user roles: ADMIN, CUSTOMER, RESTAURANT_OWNER, DELIVERY_PARTNER
- BCrypt password hashing
- Token expiration & refresh

✅ **User Management**
- CRUD operations with pagination
- Profile picture upload
- Soft delete mechanism

✅ **Restaurant Management**
- Location-based search (Haversine formula)
- Filter by cuisine, rating, price, vegetarian
- Logo upload
- Opening hours management

✅ **Menu & Food Items**
- 7 categories, 7 dietary tags
- Image upload
- Availability toggle
- Price range filtering

✅ **Order Management**
- 7 order statuses
- Real-time tracking
- Order history with pagination
- Cancellation support

✅ **Payment Integration**
- Razorpay integration
- Multiple payment methods
- Payment verification
- Transaction tracking

✅ **Delivery Tracking**
- Delivery partner assignment
- Status updates
- Completion tracking

✅ **Reviews & Ratings**
- Customer reviews
- Rating aggregation
- Average rating calculation

✅ **Email Notifications**
- Order confirmations
- Delivery notifications
- SMTP integration

✅ **Analytics**
- Restaurant revenue tracking
- Order statistics
- System-wide metrics

### Advanced Features (11/11)

✅ **Complex Queries**
- Revenue calculation
- Rating aggregation
- Location-based search
- Order statistics

✅ **Pagination & Sorting**
- All list endpoints support pagination
- Configurable page size

✅ **Filtering**
- Multi-criteria filtering
- Search functionality

✅ **Caching** (Caffeine)
- `@Cacheable` on read operations
- `@CacheEvict` on write operations
- 10-minute expiration, 1000 entries

✅ **File Upload**
- Restaurant logos
- Menu item images
- Profile pictures
- Size validation (5MB max)

✅ **Email Notification**
- Order confirmations
- Delivery updates
- Gmail SMTP integration

✅ **API Rate Limiting** (Bucket4j)
- Login: 5 requests/minute
- Orders: 10 requests/minute
- General: 100 requests/minute

✅ **Analytics APIs**
- Restaurant analytics
- System-wide statistics

✅ **Global Exception Handling**
- Centralized error handling
- Meaningful error responses
- Validation error mapping

✅ **Input Validation**
- Jakarta Validation
- `@Valid` on all endpoints
- Custom validation messages

✅ **Swagger Documentation**
- Interactive API documentation
- Request/response examples
- Authentication support

---

## 🛠️ Tech Stack

| Component             | Technology          | Version |
| --------------------- | ------------------- | ------- |
| **Framework**         | Spring Boot         | 3.2.1   |
| **Language**          | Java                | 21      |
| **Database**          | PostgreSQL          | Latest  |
| **Test DB**           | H2                  | Latest  |
| **Authentication**    | JWT (jjwt)          | 0.12.3  |
| **API Docs**          | Springdoc OpenAPI   | 2.3.0   |
| **Caching**           | Caffeine            | Latest  |
| **Email**             | Spring Mail         | Latest  |
| **Rate Limiting**     | Bucket4j            | 7.6.0   |
| **Payment**           | Razorpay            | -       |
| **Build Tool**        | Maven               | 3.6+    |
| **Testing**           | JUnit 5, Mockito    | Latest  |

---

## 🔧 Configuration

### Database Profiles

- **dev**: PostgreSQL with DDL auto-update
- **test**: H2 in-memory database
- **prod**: PostgreSQL with validation only

### Key Configuration Files

- `application.yaml` - Main configuration with profiles
- `.env.example` - Environment variable template
- `pom.xml` - Maven dependencies

### Configurable Settings

- Database connection
- JWT secret & expiration
- Email SMTP settings
- File upload limits
- Rate limiting thresholds
- Cache settings
- CORS configuration

---

## 🔒 Security

### Implemented Security Features

- JWT token-based authentication
- BCrypt password hashing
- Role-based access control (`@PreAuthorize`)
- CORS configuration
- Rate limiting
- Input validation
- Secure file upload
- No hardcoded credentials

### Security Configuration

- `SecurityConfig.java` - Spring Security setup
- `JwtAuthenticationFilter.java` - JWT validation
- `JwtTokenProvider.java` - Token generation/validation

---

## 📊 API Endpoints Summary

| Category | Endpoints | Authentication |
|----------|-----------|----------------|
| Auth | 2 | Public |
| Users | 6 | Required |
| Restaurants | 10+ | Mixed |
| Menu Items | 8+ | Mixed |
| Orders | 6 | Required |
| Payments | 3 | Required |
| Delivery | 4 | Required |
| Reviews | 4 | Required |
| Analytics | 2 | Required |
| Files | 2 | Required |

See Swagger UI for complete endpoint documentation.

---

## 🧪 Testing

### Run All Tests
```bash
./mvnw test
```

### Run Specific Test
```bash
./mvnw test -Dtest=UserServiceTest
```

### Test Coverage
- Unit tests with JUnit 5
- Mock testing with Mockito
- H2 in-memory database for integration tests

---

## 📦 Build & Deployment

### Build Production JAR
```bash
./mvnw clean package -DskipTests
```

### Run Production Build
```bash
java -jar target/food-delivery-service-0.0.1-SNAPSHOT.jar
```

### Docker (Optional)
```bash
# Build image
docker build -t food-delivery-backend .

# Run container
docker run -p 8080:8080 food-delivery-backend
```

---

## 🔍 Monitoring & Debugging

### Logging Levels

Configured in `application.yaml`:
- Root: INFO
- Application: DEBUG
- SQL: DEBUG (dev only)

### Health Check

```bash
GET /api/health
```

---

## 📝 Development Guidelines

### Code Structure
- Controllers: Handle HTTP requests only
- Services: Business logic implementation
- Repositories: Database operations
- DTOs: Data transfer objects
- Models: JPA entities

### Best Practices
- Use DTOs for API responses
- Implement soft delete for data integrity
- Add `@Transactional` for write operations
- Use `@Cacheable` for frequently accessed data
- Add `@Valid` for input validation
- Document APIs with Swagger annotations

---

## 🤝 Contributing

1. Follow the existing code structure
2. Add unit tests for new features
3. Update Swagger documentation
4. Follow Java naming conventions
5. Use meaningful commit messages

---

## 📝 License

MIT

---

## 🎓 Academic Project

This backend demonstrates production-grade Spring Boot development with:
- Clean architecture
- Security best practices
- Performance optimization
- Comprehensive documentation
- External integrations
- Advanced features

**Assignment Compliance: 11/11 Advanced Features ✅**
