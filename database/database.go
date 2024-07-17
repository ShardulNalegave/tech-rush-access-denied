package database

import (
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
)

func ConnectToDatabase() *sqlx.DB {
	dsn := os.Getenv("MOSAICIFY_POSTGRES_DSN")
	if dsn == "" {
		log.Fatal().Msg("MOSAICIFY_POSTGRES_DSN was not provided")
	}

	db := sqlx.MustConnect("postgres", dsn)
	return db
}
