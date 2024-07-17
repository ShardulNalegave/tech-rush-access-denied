package routes

import (
	"encoding/json"
	"net/http"

	"github.com/ShardulNalegave/tech-rush-access-denied/models"
	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
)

func mountUsersRoutes(r *chi.Mux) {
	r.Get("/users", getAllUsers)
	r.Get("/users/{userID}", getUser)
	r.Get("/users/{userID}/followers", getFollowers)
	r.Get("/users/{userID}/following", getFollowing)
}

func getAllUsers(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	users := make([]models.User, 0)
	if err := db.Select(&users, "SELECT * FROM users"); err != nil {
		http.Error(w, "Could not fetch all users", http.StatusInternalServerError)
		return
	}

	byts, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.Write(byts)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	userID := chi.URLParam(r, "userID")

	var user models.User
	if err := db.Get(&user, "SELECT * FROM users WHERE id = $1", userID); err != nil {
		http.Error(w, "Could not fetch user", http.StatusInternalServerError)
		return
	}

	byts, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.Write(byts)
}

func getFollowers(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	userID := chi.URLParam(r, "userID")

	users := make([]models.User, 0)
	if err := db.Select(&users, "SELECT U.* FROM followers F INNER JOIN users U ON U.id = F.follower_id WHERE F.user_id = $1", userID); err != nil {
		http.Error(w, "Could not fetch followers", http.StatusInternalServerError)
		return
	}

	byts, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.Write(byts)
}

func getFollowing(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	userID := chi.URLParam(r, "userID")

	users := make([]models.User, 0)
	if err := db.Select(&users, "SELECT U.* FROM followers F INNER JOIN users U ON U.id = F.user_id WHERE F.follower_id = $1", userID); err != nil {
		http.Error(w, "Could not fetch following", http.StatusInternalServerError)
		return
	}

	byts, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.Write(byts)
}
