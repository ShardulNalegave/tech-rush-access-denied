package main

import (
	"net/http"
	"os"

	"github.com/ShardulNalegave/tech-rush-access-denied/database"
	"github.com/ShardulNalegave/tech-rush-access-denied/routes"
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

const (
	defaultPort = "8080"
)

func main() {
	godotenv.Load()

	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stdout})

	port := os.Getenv("MOSAICIFY_PORT")
	if port == "" {
		port = defaultPort
	}

	db := database.ConnectToDatabase()

	r := chi.NewRouter()
	r.Use(database.DatabaseMiddleware(db))
	routes.MountRoutes(r)

	log.Info().
		Str("Port", port).
		Msg("Listening...")
	err := http.ListenAndServe(":"+port, r)
	log.Fatal().Err(err).Msg("Shutting down...")
}
