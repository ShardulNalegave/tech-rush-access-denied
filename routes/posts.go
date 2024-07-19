package routes

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/ShardulNalegave/tech-rush-access-denied/models"
	"github.com/ShardulNalegave/tech-rush-access-denied/sessions"
	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
)

func mountPostsRoutes(r *chi.Mux) {
	r.Get("/posts", getPosts)
	r.Get("/posts/current", getLoggedInUserPosts)
	r.Get("/posts/{postID}", getPost)
	r.Get("/posts/{postID}/likes", getPostLikes)
	r.Post("/posts/{postID}/addLike", likePost)
	r.Get("/posts/{postID}/comments", postComments)
	r.Post("/posts/{postID}/addComment", addComment)
}

func getLoggedInUserPosts(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	posts := make([]models.Post, 0)
	query := `SELECT * FROM posts WHERE posted_by = $1`
	if err := db.Select(&posts, query, s.UserID); err != nil {
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

func getPosts(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	posts := make([]models.Post, 0)
	query := `SELECT * FROM posts`
	if err := db.Select(&posts, query); err != nil {
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

func getPost(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	postID := chi.URLParam(r, "postID")

	var post models.Post
	query := `SELECT * FROM posts WHERE id = $1 LIMIT 1`
	if err := db.Get(&post, query, postID); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "No such post found", http.StatusNotFound)
			return
		}

		http.Error(w, "Couldn't fetch post", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(post)
	if err != nil {
		http.Error(w, "JSON Marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func getPostLikes(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "postID")
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	users := make([]models.User, 0)
	query := `SELECT U.id, U.name, U.email, U.bio, U.about, U.profile_pic, U.follower_count, U.following_count FROM post_likes P INNER JOIN users U ON U.id = P.user_id WHERE P.post_id = $1`
	if err := db.Select(&users, query, postID); err != nil {
		http.Error(w, "Couldn't fetch users", http.StatusInternalServerError)
	}

	byts, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(byts)
}

func likePost(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "postID")
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	tx, err := db.Beginx()
	if err != nil {
		http.Error(w, "Couldn't like", http.StatusInternalServerError)
		return
	}

	tx.Exec(`
		UPDATE posts
		SET likes = likes + 1
		WHERE id = $1
	`, postID)
	tx.Exec(`INSERT INTO post_likes(post_id, user_id) VALUES ($1, $2)`, postID, s.UserID)

	err = tx.Commit()
	if err != nil {
		http.Error(w, "Couldn't like", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Done"))
}

func postComments(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "postID")
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	comments := make([]models.Comment, 0)
	query := `SELECT * FROM comments WHERE post_id = $1`
	if err := db.Select(&comments, query, postID); err != nil {
		http.Error(w, "Could not fetch comments", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(comments)
	if err != nil {
		http.Error(w, "JSON Marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func addComment(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "postID")
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	var body struct {
		Content string `json:"content"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	query := `INSERT INTO comments(post_id, user_id, content) VALUES ($1, $2, $3) RETURNING id`
	res := db.QueryRow(query, postID, s.UserID, body.Content)
	if err := res.Err(); err != nil {
		http.Error(w, "Failed to create comment", http.StatusInternalServerError)
		return
	}

	var id uint64
	res.Scan(&id)

	pID, _ := strconv.Atoi(postID)

	data, err := json.Marshal(struct {
		ID      uint64 `json:"id"`
		PostID  uint64 `json:"post_id"`
		UserID  uint64 `json:"user_id"`
		Content string `json:"string"`
	}{
		ID:      id,
		PostID:  uint64(pID),
		UserID:  s.UserID,
		Content: body.Content,
	})

	if err != nil {
		http.Error(w, "JSON Marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
