
# Project Structure
The project is structured in the following way.

- `/app/` - The app directory contains code for the frontend
- `/` - The root directory contains code for the backend
  - `/routes/` - Contains handlers for all API endpoints
  - `/models/` - Contains struct models for all database tables
  - `/database/` - Contains code for connecting to PostgreSQL and provides a middleware for server
  - `/sessions/` - Contains code for User Session management using Redis and also provides a middleware
  - `/search` - Contains code for connecting to Meilisearch and provides middleware
  - `/auth/` - Contains handlers for all authentication related methods and routes
  - `/utils/` - Contains utility structs and variables