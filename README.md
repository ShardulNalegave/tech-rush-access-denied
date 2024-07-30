![Lading Page](/app/public/Front.png)

# Mosaicify

Where every picture tells a thousand stories.

Mosaicify is a Photo Gallery and sharing app built as our project for the PISC (PICT IEEE Student Chapter) organised Hackathon - Tech Rush.

## Getting Started

1. Install pre-requisites
   - PostgreSQL
   - Redis
   - Meilisearch
   - Go
   - Node + npm
2. Clone the repo
3. Create a `.env` file in project directory and define the following variables
   - `MOSAICIFY_STORAGE_DIR` - Storage directory for all posts and profile pictures
   - `MOSAICIFY_POSTGRES_DSN` - PostgreSQL DSN string
   - `MOSAICIFY_REDIS_ADDR` - Address where Redis is hosted
   - `MOSAICIFY_REDIS_DB` - Redis DB
   - `MOSAICIFY_REDIS_PASS` - Redis password
   - `MOSAICIFY_MEILISEARCH_ADDR` - Address where meilisearch is hosted
   - `MOSAICIFY_MEILISEARCH_MASTER_KEY` - Meilisearch master-key
   - `MOSAICIFY_AUTH_HASH_KEY` - Cookie encryption hash key (at least 32 bytes long)
   - `MOSAICIFY_AUTH_BLOCK_KEY` - Cookie encryption block key (16 or 32 bytes long)
4. In the directory specified in `MOSAICIFY_STORAGE_DIR`, create two sub-directories named `profile_pics` and `posts`. And also store a default profile picture for users by saving it as `defaultProfilePic` (no extension) and saving it in `MOSAICIFY_STORAGE_DIR`
5. Now run the backend by running `go run ./main.go` in project directory.
6. Similarly, in a new terminal window, run `npm install && npm run dev` in the `app` directory.

After following these steps, your backend should be running at `http://localhost:5000` and frontend at `http://localhost:5173`

## Documentation

- [Project Structure](docs/Project%20Structure.md)
- [Frontend](docs/Frontend.md)
- [API Specification](docs/API%20Spec.md)
