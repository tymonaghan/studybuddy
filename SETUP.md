# StudyBuddy Local Development Setup

This guide will help you set up StudyBuddy for local development with a PostgreSQL database.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Docker](https://www.docker.com/get-started) and Docker Compose (for local PostgreSQL)
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/tymonaghan/studybuddy.git
cd studybuddy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and customize it if needed:

```bash
cp .env.example .env
```

The default `.env.example` is configured to work with the Docker Compose setup. If you're using a different PostgreSQL setup, update the `DATABASE_URL` in your `.env` file.

### 4. Start PostgreSQL Database

Using Docker Compose (recommended):

```bash
docker-compose up -d
```

This will start a PostgreSQL container with:
- Database name: `studybuddy`
- Username: `studybuddy`
- Password: `studybuddy`
- Port: `5432`

To stop the database:

```bash
docker-compose down
```

To stop and remove all data:

```bash
docker-compose down -v
```

### 5. Seed the Database

Populate the database with initial test data:

```bash
npm run seed
```

This will create:
- Test users (jimmy, ricky, bluey)
- Sample projects
- Sample sources

### 6. Start the Application

For development with hot reloading:

```bash
npm run start:dev
```

This will:
- Start webpack in watch mode for frontend changes
- Start nodemon for backend changes
- The app will be available at `http://localhost:3030`

For production mode:

```bash
npm run build
npm start
```

## Database Management

### Viewing Database Contents

Connect to the PostgreSQL database:

```bash
docker exec -it studybuddy-postgres psql -U studybuddy -d studybuddy
```

Useful PostgreSQL commands:
- `\dt` - List all tables
- `\d table_name` - Describe a table
- `SELECT * FROM "Users";` - View all users
- `\q` - Quit

### Resetting the Database

To completely reset the database:

1. Set `FORCE_SYNC=true` in your `.env` file, OR
2. Run the seed script which forces a sync:

```bash
npm run seed
```

### Manual PostgreSQL Setup

If you prefer not to use Docker, install PostgreSQL locally:

1. Install PostgreSQL for your operating system
2. Create a database named `studybuddy`:
   ```bash
   createdb studybuddy
   ```
3. Update your `.env` file with your local PostgreSQL connection string:
   ```
   DATABASE_URL=postgres://your_username@localhost:5432/studybuddy
   ```

## Testing

Run tests with the test database:

```bash
npm run test:dev
```

## Available Scripts

- `npm run build` - Build the frontend bundle
- `npm start` - Start the server in production mode
- `npm run start:dev` - Start the server in development mode with hot reloading
- `npm run start-webpack` - Start only the webpack dev server
- `npm run seed` - Seed the database with test data
- `npm test` - Run tests with remote test database
- `npm run test:dev` - Run tests with local test database

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. **Check if PostgreSQL is running:**
   ```bash
   docker ps
   ```
   You should see the `studybuddy-postgres` container running.

2. **Check database health:**
   ```bash
   docker-compose logs postgres
   ```

3. **Verify connection string:**
   Make sure your `.env` file has the correct `DATABASE_URL`.

4. **Restart the database:**
   ```bash
   docker-compose restart
   ```

### Port Already in Use

If port 5432 or 3030 is already in use:

- **For PostgreSQL (5432):** Stop other PostgreSQL instances or change the port in `docker-compose.yml`
- **For the app (3030):** Change the `PORT` variable in your `.env` file

### Module Not Found Errors

If you see module not found errors:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
studybuddy/
├── app/              # React frontend components
├── public/           # Static files
├── server/           # Express backend
│   ├── db/          # Database models and configuration
│   └── ...          # API routes
├── tests/           # Test files
├── .env.example     # Example environment variables
├── docker-compose.yml # Docker configuration for PostgreSQL
├── package.json     # Node dependencies and scripts
└── start.js        # Application entry point
```

## Next Steps

- Create a user account at `http://localhost:3030`
- Create a project
- Add sources to your project
- Take notes on your sources

For more information, see the main [README.md](./README.md).
