# 🐳 Docker Deployment Guide

Complete guide for running the Food Delivery System using Docker containers.

## 📋 Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose v2.0+
- At least 4GB RAM available for Docker
- Ports 5432, 8080, and 5173 available

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
cd Food_Delivery_Backend
```

### 2. Update Environment Variables

Edit `docker-compose.yml` and update:

```yaml
# Email Configuration
MAIL_USERNAME: your-email@gmail.com
MAIL_PASSWORD: your-gmail-app-password

# Razorpay Configuration (if using real payments)
RAZORPAY_KEY_ID: your_razorpay_key_id
RAZORPAY_KEY_SECRET: your_razorpay_secret

# JWT Secret (IMPORTANT: Change in production!)
JWT_SECRET: your-super-secret-jwt-key-minimum-256-bits
```

### 3. Start All Services

```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
```

### 4. Access the Application

- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Frontend**: http://localhost:5173
- **PostgreSQL**: localhost:5432

## 🛠️ Docker Commands

### Container Management

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Stop and remove volumes (WARNING: Deletes database data)
docker-compose down -v

# View running containers
docker-compose ps

# View logs
docker-compose logs -f [service-name]
```

### Building

```bash
# Rebuild containers
docker-compose build

# Rebuild specific service
docker-compose build backend

# Build without cache
docker-compose build --no-cache

# Pull latest images
docker-compose pull
```

### Database Management

```bash
# Access PostgreSQL shell
docker exec -it foodmood-postgres psql -U postgres -d food_delivery_db

# Backup database
docker exec foodmood-postgres pg_dump -U postgres food_delivery_db > backup.sql

# Restore database
docker exec -i foodmood-postgres psql -U postgres food_delivery_db < backup.sql

# View database logs
docker-compose logs -f postgres
```

### Debugging

```bash
# Execute command in running container
docker exec -it foodmood-backend sh

# View container resource usage
docker stats

# Inspect container
docker inspect foodmood-backend

# View container health
docker ps --format "table {{.Names}}\t{{.Status}}"
```

## 📦 Services Overview

### 1. PostgreSQL Database

- **Container**: `foodmood-postgres`
- **Image**: `postgres:16-alpine`
- **Port**: 5432
- **Volume**: `postgres_data` (persists database)
- **Health Check**: Every 10s

### 2. Spring Boot Backend

- **Container**: `foodmood-backend`
- **Build**: Multi-stage (Maven + JRE)
- **Port**: 8080
- **Volume**: `backend_uploads` (file uploads)
- **Health Check**: Every 30s
- **Depends On**: PostgreSQL

### 3. React Frontend

- **Container**: `foodmood-frontend`
- **Build**: Multi-stage (Node + Nginx)
- **Port**: 5173
- **Health Check**: Every 30s
- **Depends On**: Backend

## 🔧 Configuration

### Environment Variables

All configuration is in `docker-compose.yml`:

```yaml
environment:
  DB_URL: jdbc:postgresql://postgres:5432/food_delivery_db
  JWT_SECRET: your-secret-key
  MAIL_USERNAME: your-email@gmail.com
  # ... more variables
```

### Volumes

```yaml
volumes:
  postgres_data:      # Database persistence
  backend_uploads:    # Uploaded files (logos, images)
```

### Networks

All services communicate via `foodmood-network` bridge network.

## 🏥 Health Checks

### Backend Health Check

```bash
curl http://localhost:8080/api/health
```

### Database Health Check

```bash
docker exec foodmood-postgres pg_isready -U postgres
```

### View All Health Status

```bash
docker-compose ps
```

## 🔍 Troubleshooting

### Backend Won't Start

1. Check database is healthy:
   ```bash
   docker-compose logs postgres
   ```

2. Check backend logs:
   ```bash
   docker-compose logs backend
   ```

3. Verify environment variables:
   ```bash
   docker exec foodmood-backend env
   ```

### Database Connection Issues

```bash
# Test connection from backend container
docker exec -it foodmood-backend sh
wget --spider http://postgres:5432
```

### Port Already in Use

```bash
# Find process using port
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Mac/Linux

# Change port in docker-compose.yml
ports:
  - "8081:8080"  # Use 8081 instead
```

### Out of Memory

```bash
# Increase Docker memory limit in Docker Desktop settings
# Recommended: 4GB minimum

# Or limit container memory
services:
  backend:
    mem_limit: 1g
```

### Slow Build Times

```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker-compose build

# Or enable in Docker Desktop settings
```

## 📊 Monitoring

### Resource Usage

```bash
# Real-time stats
docker stats

# Container logs
docker-compose logs -f --tail=100
```

### Database Monitoring

```bash
# Connect to PostgreSQL
docker exec -it foodmood-postgres psql -U postgres

# Check connections
SELECT * FROM pg_stat_activity;

# Check database size
SELECT pg_size_pretty(pg_database_size('food_delivery_db'));
```

## 🚀 Production Deployment

### 1. Update Configuration

```yaml
# Use production profile
SPRING_PROFILE: prod

# Secure JWT secret (64+ characters)
JWT_SECRET: <generate-strong-secret>

# Real email credentials
MAIL_USERNAME: production-email@domain.com
MAIL_PASSWORD: <app-password>

# Real Razorpay credentials
RAZORPAY_KEY_ID: <production-key>
RAZORPAY_KEY_SECRET: <production-secret>
```

### 2. Use External Database

```yaml
# Point to managed PostgreSQL
DB_URL: jdbc:postgresql://your-db-host:5432/food_delivery_db
DB_USERNAME: <production-user>
DB_PASSWORD: <strong-password>
```

### 3. Enable HTTPS

Add reverse proxy (Nginx/Traefik) with SSL certificates.

### 4. Security Hardening

```yaml
# Use secrets instead of environment variables
secrets:
  db_password:
    file: ./secrets/db_password.txt
```

## 🧹 Cleanup

### Remove All Containers

```bash
docker-compose down
```

### Remove Containers and Volumes

```bash
docker-compose down -v
```

### Remove Images

```bash
docker-compose down --rmi all
```

### Full Cleanup

```bash
# Stop and remove everything
docker-compose down -v --rmi all

# Remove unused Docker resources
docker system prune -a
```

## 📝 Development Workflow

### 1. Development Mode

```bash
# Start only database
docker-compose up -d postgres

# Run backend locally
cd backend
./mvnw spring-boot:run

# Run frontend locally
cd frontend
npm run dev
```

### 2. Hot Reload (Optional)

Mount source code as volume for live updates:

```yaml
services:
  backend:
    volumes:
      - ./backend/src:/app/src
```

### 3. Testing

```bash
# Run tests in container
docker exec foodmood-backend ./mvnw test

# Or build with tests
docker-compose build --build-arg SKIP_TESTS=false
```

## 🎯 Best Practices

1. **Always use `.env` files** for sensitive data (not in docker-compose.yml)
2. **Use volumes** for data persistence
3. **Implement health checks** for all services
4. **Use multi-stage builds** to reduce image size
5. **Run as non-root user** for security
6. **Tag images** with versions
7. **Use `.dockerignore`** to exclude unnecessary files
8. **Monitor resource usage** regularly

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Spring Boot Docker Guide](https://spring.io/guides/topicals/spring-boot-docker/)

---

**Your Food Delivery System is now containerized and ready for deployment! 🐳**
