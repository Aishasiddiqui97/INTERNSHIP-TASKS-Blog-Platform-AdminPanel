# Docker MongoDB Setup

## Prerequisites
- Docker Desktop installed on Windows
- Docker Compose (comes with Docker Desktop)

## Setup Instructions

### 1. Start MongoDB with Docker

Open terminal in project root and run:

```bash
docker-compose up -d
```

This will:
- Download MongoDB image (if not already downloaded)
- Start MongoDB on port 27017
- Start Mongo Express (Web UI) on port 8081

### 2. Verify MongoDB is Running

```bash
docker ps
```

You should see two containers:
- `blog-mongodb` (MongoDB server)
- `blog-mongo-express` (Web UI)

### 3. Access Mongo Express (Optional)

Open browser: http://localhost:8081

Login credentials:
- Username: `admin`
- Password: `admin123`

### 4. Stop MongoDB

```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```

## MongoDB Connection Details

- **Host:** localhost
- **Port:** 27017
- **Username:** admin
- **Password:** admin123
- **Database:** blog-platform
- **Connection String:** `mongodb://admin:admin123@localhost:27017/blog-platform?authSource=admin`

## Troubleshooting

### Port already in use
If port 27017 is already in use, change it in `docker-compose.yml`:
```yaml
ports:
  - "27018:27017"  # Use 27018 instead
```

Then update `.env.local`:
```
MONGODB_URI="mongodb://admin:admin123@localhost:27018/blog-platform?authSource=admin"
```

### Container won't start
```bash
docker-compose logs mongodb
```

### Reset everything
```bash
docker-compose down -v
docker-compose up -d
```
