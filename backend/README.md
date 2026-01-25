# Food Delivery System - Backend

Spring Boot backend for the Food Delivery System.

## 🚀 Quick Start

### Prerequisites
- Java 21
- Maven 3.6+
- PostgreSQL 12+

### Running the Application

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Configure Database:**
```sql
CREATE DATABASE food_delivery_db;
```

3. **Update `src/main/resources/application.yaml`** with your database credentials

4. **Run the application:**
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

## 📚 API Documentation

Once running, access:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/backend/fooddelivery/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── service/         # Business logic
│   │   │   ├── repository/      # Data access
│   │   │   ├── model/           # Entities
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── security/        # Security & JWT
│   │   │   ├── exception/       # Exception handling
│   │   │   └── util/            # Utilities
│   │   └── resources/
│   │       └── application.yaml # Configuration
│   └── test/                     # Tests
├── pom.xml                       # Maven dependencies
└── mvnw                          # Maven wrapper
```

## 🔧 Configuration

Edit `src/main/resources/application.yaml` for:
- Database connection
- JWT settings
- Email configuration
- File upload settings
- Rate limiting

## 🧪 Testing

```bash
./mvnw test
```

## 📦 Build

```bash
./mvnw clean package
```

## 📝 License

MIT
