package routes

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path"
	"strconv"

	"github.com/ShardulNalegave/tech-rush-access-denied/models"
	"github.com/ShardulNalegave/tech-rush-access-denied/sessions"
	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
)

func mountUsersRoutes(r *chi.Mux) {
	r.Get("/users/current", getLoggedInUser)
	r.Put("/users/current", updateUserProfile)
	r.Post("/users/current/profilePic", setProfilePic)
	r.Get("/users", getAllUsers)
	r.Get("/users/{userID}", getUser)
	r.Get("/users/{userID}/followers", getFollowers)
	r.Get("/users/{userID}/following", getFollowing)
	r.Get("/users/{userID}/likedPosts", likedPosts)
	r.Post("/users/{userID}/follow", addFollow)
	r.Post("/users/{userID}/unfollow", removeFollow)
	r.Get("/users/{userID}/doesFollow", doesUserFollow)
	r.Get("/users/{userID}/posts", getPostsByUser)
}

func getLoggedInUser(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	var user models.User
	if err := db.Get(&user, "SELECT U.id, U.name, U.email, U.bio, U.about, U.follower_count, U.following_count FROM users U WHERE id = $1 LIMIT 1", s.UserID); err != nil {
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

func updateUserProfile(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	var body struct {
		Name  *string `json:"name"`
		Bio   *string `json:"bio"`
		About *string `json:"about"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.Get(&user, "SELECT U.name, U.bio, U.about FROM users U WHERE id = $1 LIMIT 1", s.UserID); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "No such user found", http.StatusNotFound)
			return
		}

		http.Error(w, "Could not fetch user", http.StatusInternalServerError)
		return
	}

	if body.Name != nil {
		user.Name = *body.Name
	}
	if body.Bio != nil {
		user.Bio = body.Bio
	}
	if body.About != nil {
		user.About = body.About
	}

	query := `
		UPDATE users
		SET name = $1, bio = $2, about = $3
		WHERE id = $4
	`
	_, err := db.Exec(query, user.Name, user.Bio, user.About, s.UserID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Could not update profile", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}

func setProfilePic(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	var body struct {
		Data *string `json:"data"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	baseDir := os.Getenv("MOSAICIFY_STORAGE_DIR")
	if baseDir == "" {
		log.Fatal().Msg("MOSAICIFY_STORAGE_DIR was not provided")
	}

	fname := strconv.Itoa(int(s.UserID))
	fpath := path.Join(baseDir, "profile_pics", fname)

	if body.Data == nil {
		if err := os.Remove(fpath); err != nil {
			if err != os.ErrNotExist {
				fmt.Println(err)
			}
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Done"))
		return
	}

	byts, err := base64.StdEncoding.DecodeString(*body.Data)
	if err != nil {
		http.Error(w, "Could not decode provided image", http.StatusBadRequest)
		return
	}

	f, err := os.Create(fpath)
	if err != nil {
		http.Error(w, "Could not save image", http.StatusInternalServerError)
		return
	}
	defer f.Close()

	if _, err := f.Write(byts); err != nil {
		http.Error(w, "Could not save image", http.StatusInternalServerError)
		return
	}

	if err := f.Sync(); err != nil {
		http.Error(w, "Could not save image", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}

func getAllUsers(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	users := make([]models.User, 0)
	if err := db.Select(&users, "SELECT U.id, U.name, U.email, U.bio, U.about, U.follower_count, U.following_count FROM users U"); err != nil {
		fmt.Println(err)
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
	if err := db.Get(&user, "SELECT U.id, U.name, U.email, U.bio, U.about, U.follower_count, U.following_count FROM users U WHERE id = $1 LIMIT 1", userID); err != nil {
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
	if err := db.Select(&users, "SELECT U.id, U.name, U.email, U.bio, U.about, U.follower_count, U.following_count FROM followers F INNER JOIN users U ON U.id = F.follower_id WHERE F.user_id = $1", userID); err != nil {
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
	if err := db.Select(&users, "SELECT U.id, U.name, U.email, U.bio, U.about, U.follower_count, U.following_count FROM followers F INNER JOIN users U ON U.id = F.user_id WHERE F.follower_id = $1", userID); err != nil {
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

	uID, err := strconv.Atoi(userID)
	if err != nil {
		http.Error(w, "Invalid 'userID' provided", http.StatusBadRequest)
		return
	}

	if s.UserID == uint64(uID) {
		http.Error(w, "Cannot follow yourself", http.StatusUnauthorized)
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

func removeFollow(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	uID, err := strconv.Atoi(userID)
	if err != nil {
		http.Error(w, "Invalid 'userID' provided", http.StatusBadRequest)
		return
	}

	if s.UserID == uint64(uID) {
		http.Error(w, "Cannot unfollow yourself", http.StatusUnauthorized)
		return
	}

	tx, err := db.Beginx()
	if err != nil {
		http.Error(w, "Couldn't unfollow", http.StatusInternalServerError)
		return
	}

	tx.Exec(`
		UPDATE users
		SET following_count = following_count - 1
		WHERE id = $1
	`, s.UserID)
	tx.Exec(`
		UPDATE users
		SET follower_count = follower_count - 1
		WHERE id = $1
	`, userID)
	tx.Exec(`DELETE FROM followers WHERE user_id = $1 AND follower_id = $2`, userID, s.UserID)

	err = tx.Commit()
	if err != nil {
		http.Error(w, "Couldn't unfollow", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Done"))
}

func doesUserFollow(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	result := false
	row := db.QueryRow(`SELECT EXISTS(SELECT * FROM followers WHERE user_id = $1 AND follower_id = $2)`, userID, s.UserID)
	if err := row.Err(); err != nil {
		http.Error(w, "Couldn't fetch", http.StatusInternalServerError)
		return
	}
	if err := row.Scan(&result); err != nil {
		http.Error(w, "Couldn't fetch", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(struct {
		Result bool `json:"result"`
	}{Result: result})
	if err != nil {
		http.Error(w, "JSON Marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func getPostsByUser(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "userID")
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	posts := make([]models.Post, 0)
	query := `SELECT * FROM posts WHERE posted_by = $1 ORDER BY created_at DESC`
	if err := db.Select(&posts, query, userID); err != nil {
		http.Error(w, "Couldn't fetch posts", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(posts)
	if err != nil {
		http.Error(w, "JSON Marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
