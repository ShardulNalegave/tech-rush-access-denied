package main

import (
	"net/http"
	"os"

	"github.com/ShardulNalegave/tech-rush-access-denied/auth"
	"github.com/ShardulNalegave/tech-rush-access-denied/database"
	"github.com/ShardulNalegave/tech-rush-access-denied/routes"
	"github.com/ShardulNalegave/tech-rush-access-denied/sessions"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

const (
	defaultPort = "5000"
)

func main() {
	godotenv.Load()

	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stdout})

	db := database.ConnectToDatabase()
	sm := sessions.NewSessionManager()

	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	}))

	r.Use(auth.SecureCookieMiddleware())
	r.Use(database.DatabaseMiddleware(db))
	r.Use(sessions.SessionManagerMiddleware(sm))
	r.Use(auth.AuthMiddleware())
	routes.MountRoutes(r)

	log.Info().
		Str("Port", defaultPort).
		Msg("Listening...")
	err := http.ListenAndServe(":"+defaultPort, r)
	log.Fatal().Err(err).Msg("Shutting down...")
}
