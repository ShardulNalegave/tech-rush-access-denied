package routes

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog/log"
)

func mountStorageRoutes(r *chi.Mux) {
	baseDir := os.Getenv("MOSAICIFY_STORAGE_DIR")
	if baseDir == "" {
		log.Fatal().Msg("MOSAICIFY_STORAGE_DIR was not provided")
	}

	fs := http.FileServer(http.Dir(baseDir))
	r.Handle("/storage/*", http.StripPrefix("/storage", fs))
}
