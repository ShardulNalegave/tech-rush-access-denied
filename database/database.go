package database

import (
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
)

const databaseInit = `
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password_hash TEXT NOT NULL,
	bio VARCHAR(255) NOT NULL DEFAULT '',
	about TEXT NOT NULL DEFAULT '',
	follower_count INTEGER NOT NULL DEFAULT 0,
	following_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS followers (
	user_id INTEGER NOT NULL REFERENCES users(id),
	follower_id INTEGER NOT NULL REFERENCES users(id),
	PRIMARY KEY (user_id, follower_id)
);

CREATE TABLE IF NOT EXISTS posts (
	id SERIAL PRIMARY KEY NOT NULL,
	posted_by INTEGER NOT NULL REFERENCES users(id),
	likes INTEGER NOT NULL DEFAULT 0,
	caption VARCHAR(255) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS post_likes (
	post_id INTEGER NOT NULL REFERENCES posts(id),
	user_id INTEGER NOT NULL REFERENCES users(id),
	PRIMARY KEY (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS comments (
	id SERIAL PRIMARY KEY NOT NULL,
	post_id INTEGER NOT NULL REFERENCES posts(id),
	user_id INTEGER NOT NULL REFERENCES users(id),
	content VARCHAR(255) NOT NULL DEFAULT ''
);
`

func ConnectToDatabase() *sqlx.DB {
	dsn := os.Getenv("MOSAICIFY_POSTGRES_DSN")
	if dsn == "" {
		log.Fatal().Msg("MOSAICIFY_POSTGRES_DSN was not provided")
	}

	db := sqlx.MustConnect("postgres", dsn)
	if _, err := db.Exec(databaseInit); err != nil {
		log.Fatal().Err(err).Msg("Could not run initialization query on the database")
	}

	return db
}
