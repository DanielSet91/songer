## Backend Setup Guide

### .env File
Create a `.env` file in your project root with the following content:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:songer@postgres:5432/songerdb?schema=public"
```

### Installation
Build the Docker images:

```bash
$ docker-compose build
```

Run the application:

```bash
$ docker-compose up
```

### Git
Performing rebase for merges:

```bash
$ git pull --rebase origin main
```

### Running Prisma Migration

```bash
$ docker exec -it songs-api-1 npx prisma migrate dev --name <migration name>
```

### Changing data
To update the data, drop the `song_list` file into the folder:
```
src/app/rawData
```