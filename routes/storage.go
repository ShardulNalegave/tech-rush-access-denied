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

	fs := http.StripPrefix("/storage", http.FileServer(http.Dir(baseDir)))
	r.HandleFunc("/storage/*", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")
		fs.ServeHTTP(w, r)
	})
}
