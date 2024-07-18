package routes

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/ShardulNalegave/tech-rush-access-denied/models"
	"github.com/ShardulNalegave/tech-rush-access-denied/sessions"
	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
)

func mountUsersRoutes(r *chi.Mux) {
	r.Get("/users/current", getLoggedInUser)
	r.Get("/users", getAllUsers)
	r.Get("/users/{userID}", getUser)
	r.Get("/users/{userID}/followers", getFollowers)
	r.Get("/users/{userID}/following", getFollowing)
	r.Get("/users/{userID}/likedPosts", likedPosts)
	r.Post("/users/{userID}/follow", addFollow)
}

func getLoggedInUser(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		byts, err := json.Marshal(nil)
		if err != nil {
			http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusUnauthorized)
		w.Write(byts)
		return
	}

	var user models.User
	if err := db.Get(&user, "SELECT U.id, U.name, U.email, U.bio, U.about, U.profile_pic, U.follower_count, U.following_count FROM users U WHERE id = $1 LIMIT 1", s.UserID); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "No such user found", http.StatusNotFound)
			return
		}

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

func getAllUsers(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	users := make([]models.User, 0)
	if err := db.Select(&users, "SELECT U.id, U.name, U.email, U.bio, U.about, U.profile_pic, U.follower_count, U.following_count FROM users U"); err != nil {
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
	if err := db.Get(&user, "SELECT U.id, U.name, U.email, U.bio, U.about, U.profile_pic, U.follower_count, U.following_count FROM users U WHERE id = $1 LIMIT 1", userID); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "No such user found", http.StatusNotFound)
			return
		}

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
	if err := db.Select(&users, "SELECT U.id, U.name, U.email, U.bio, U.about, U.profile_pic, U.follower_count, U.following_count FROM followers F INNER JOIN users U ON U.id = F.follower_id WHERE F.user_id = $1", userID); err != nil {
		http.Error(w, "Could not fetch followers", http.StatusInternalServerError)
		return
	}

	byts, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(byts)
}

func getFollowing(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	userID := chi.URLParam(r, "userID")

	users := make([]models.User, 0)
	if err := db.Select(&users, "SELECT U.id, U.name, U.email, U.bio, U.about, U.profile_pic, U.follower_count, U.following_count FROM followers F INNER JOIN users U ON U.id = F.user_id WHERE F.follower_id = $1", userID); err != nil {
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

func likedPosts(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	users := make([]models.Post, 0)
	query := `SELECT P.* FROM post_likes PL INNER JOIN posts P ON P.id = PL.post_id WHERE PL.user_id = $1`
	if err := db.Select(&users, query, userID); err != nil {
		http.Error(w, "Couldn't fetch posts", http.StatusInternalServerError)
	}

	byts, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(byts)
}

func addFollow(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	tx, err := db.Beginx()
	if err != nil {
		http.Error(w, "Couldn't follow", http.StatusInternalServerError)
		return
	}

	tx.Exec(`
		UPDATE users
		SET following_count = following_count + 1
		WHERE id = $1
	`, s.UserID)
	tx.Exec(`
		UPDATE users
		SET follower_count = follower_count + 1
		WHERE id = $1
	`, userID)
	tx.Exec(`INSERT INTO followers(user_id, follower_id) VALUES ($1, $2)`, userID, s.UserID)

	err = tx.Commit()
	if err != nil {
		http.Error(w, "Couldn't follow", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Done"))
}
