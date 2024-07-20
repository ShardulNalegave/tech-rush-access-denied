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

func mountCommentsRoutes(r *chi.Mux) {
	r.Get("/comments", getComments)
	r.Get("/comments/current", getLoggedInUserComments)
	r.Get("/comments/{commentID}", getComment)
	r.Delete("/comments/{commentID}", deleteComment)
	r.Put("/comments/{commentID}", updatePostContent)
}

func getLoggedInUserComments(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	comments := make([]models.Comment, 0)
	query := `SELECT * FROM comments WHERE user_id = $1`
	if err := db.Select(&comments, query, s.UserID); err != nil {
		http.Error(w, "Couldn't fetch comments", http.StatusInternalServerError)
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

func getComment(w http.ResponseWriter, r *http.Request) {
	commentID := chi.URLParam(r, "commentID")
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	var comment models.Comment
	if err := db.Get(&comment, `SELECT * FROM comments WHERE id = $1`, commentID); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "No such comment", http.StatusNotFound)
			return
		}

		http.Error(w, "Couldn't fetch comment", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(comment)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func getComments(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	comments := make([]models.Comment, 0)
	if err := db.Select(&comments, `SELECT * FROM comments`); err != nil {
		http.Error(w, "Couldn't fetch comments", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(comments)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func deleteComment(w http.ResponseWriter, r *http.Request) {
	commentID := chi.URLParam(r, "commentID")
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	var userID uint64
	row := db.QueryRow(`SELECT user_id FROM comments WHERE id = $1 LIMIT 1`, commentID)
	if err := row.Err(); err != nil {
		http.Error(w, "Comment doesn't exist", http.StatusNotFound)
		return
	}
	if err := row.Scan(&userID); err != nil {
		http.Error(w, "Couldn't fetch comment", http.StatusInternalServerError)
		return
	}

	if s.UserID != userID {
		http.Error(w, "Cannot delete comment made by other users", http.StatusUnauthorized)
		return
	}

	_, err := db.Exec(`DELETE FROM comments WHERE id = $1`, commentID)
	if err != nil {
		http.Error(w, "Could not delete the comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}

func updatePostContent(w http.ResponseWriter, r *http.Request) {
	commentID := chi.URLParam(r, "commentID")
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)

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

	var userID uint64
	row := db.QueryRow(`SELECT user_id FROM comments WHERE id = $1 LIMIT 1`, commentID)
	if err := row.Err(); err != nil {
		http.Error(w, "Comment doesn't exist", http.StatusNotFound)
		return
	}
	if err := row.Scan(&userID); err != nil {
		http.Error(w, "Couldn't fetch comment", http.StatusInternalServerError)
		return
	}

	if s.UserID != userID {
		http.Error(w, "Cannot update comment made by other users", http.StatusUnauthorized)
		return
	}

	query := `
		UPDATE comments
		SET content = $1
		WHERE id = $2
	`
	_, err := db.Exec(query, body.Content, commentID)
	if err != nil {
		http.Error(w, "Couldn't update the comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}
