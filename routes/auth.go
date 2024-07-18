package routes

import (
	"github.com/ShardulNalegave/tech-rush-access-denied/auth"
	"github.com/go-chi/chi/v5"
)

func mountAuthRoutes(r *chi.Mux) {
	r.Post("/auth/login", auth.LoginHandler)
	r.Post("/auth/logout", auth.LogoutHandler)
	r.Post("/auth/create", auth.CreateUserHandler)
}
