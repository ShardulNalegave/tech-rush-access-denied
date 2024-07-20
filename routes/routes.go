package routes

import "github.com/go-chi/chi/v5"

func MountRoutes(r *chi.Mux) {
	mountAuthRoutes(r)
	mountUsersRoutes(r)
	mountPostsRoutes(r)
	mountCommentsRoutes(r)
	mountStorageRoutes(r)
}
