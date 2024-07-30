package routes

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"os"
	"path"
	"strconv"
	"time"

	"github.com/ShardulNalegave/tech-rush-access-denied/models"
	"github.com/ShardulNalegave/tech-rush-access-denied/search"
	"github.com/ShardulNalegave/tech-rush-access-denied/sessions"
	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	"github.com/meilisearch/meilisearch-go"
	"github.com/rs/zerolog/log"
)

func mountPostsRoutes(r *chi.Mux) {
	r.Get("/posts", getPosts)
	r.Post("/posts", createPost)
	r.Get("/posts/current", getLoggedInUserPosts)
	r.Get("/posts/current/feed", getLoggedInUserFeed)
	r.Post("/posts/search", searchPosts)
	r.Get("/posts/{postID}", getPost)
	r.Get("/posts/{postID}/likes", getPostLikes)
	r.Post("/posts/{postID}/likes", likePost)
	r.Delete("/posts/{postID}/likes", deleteLike)
	r.Get("/posts/{postID}/doesLike", doesUserLikePost)
	r.Get("/posts/{postID}/comments", postComments)
	r.Post("/posts/{postID}/comments", addComment)
	r.Delete("/posts/{postID}", deletePost)
}

func searchPosts(w http.ResponseWriter, r *http.Request) {
	srch := r.Context().Value(utils.SearchKey).(*search.Search)

	var body struct {
		Query string `json:"query"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	resp, err := srch.ImagesIndex.Search(body.Query, &meilisearch.SearchRequest{
		Limit: 10,
	})

	if err != nil {
		http.Error(w, "Couldn't search", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(resp.Hits)
	if err != nil {
		http.Error(w, "JSON Marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func getLoggedInUserFeed(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	followingIDs := make([]uint64, 0)
	query := `SELECT user_id FROM followers WHERE follower_id = $1`
	if err := db.Select(&followingIDs, query, s.UserID); err != nil {
		http.Error(w, "Couldn't fetch posts", http.StatusInternalServerError)
		return
	}

	posts := make([]models.Post, 0)
	query, args, err := sqlx.In(`SELECT * FROM posts WHERE posted_by IN (?) ORDER BY created_at DESC`, followingIDs)
	if err != nil {
		http.Error(w, "Couldn't fetch posts", http.StatusInternalServerError)
		return
	}

	query = db.Rebind(query)
	if err := db.Select(&posts, query, args...); err != nil {
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

func getLoggedInUserPosts(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	posts := make([]models.Post, 0)
	query := `SELECT * FROM posts WHERE posted_by = $1 ORDER BY created_at DESC`
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
	query := `SELECT * FROM posts ORDER BY created_at DESC`
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

func createPost(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	srch := r.Context().Value(utils.SearchKey).(*search.Search)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	baseDir := os.Getenv("MOSAICIFY_STORAGE_DIR")
	if baseDir == "" {
		log.Fatal().Msg("MOSAICIFY_STORAGE_DIR was not provided")
	}

	var body struct {
		Caption  string   `json:"caption"`
		Data     *string  `json:"data"`
		Keywords []string `json:"keywords"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	createdAt := time.Now()
	query := `
		INSERT INTO posts(posted_by, caption, created_at)
		VALUES ($1, $2, $3)
		RETURNING id
	`
	row := db.QueryRow(query, s.UserID, body.Caption, createdAt)
	if err := row.Err(); err != nil {
		http.Error(w, "Couldn't create post", http.StatusInternalServerError)
		return
	}

	var pID uint64
	if err := row.Scan(&pID); err != nil {
		http.Error(w, "Couldn't create post", http.StatusInternalServerError)
		return
	}

	fname := strconv.Itoa(int(pID))
	fpath := path.Join(baseDir, "posts", fname)

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

	srch.ImagesIndex.AddDocuments([]map[string]any{
		{"id": pID, "posted_by": s.UserID, "caption": body.Caption, "keywords": body.Keywords},
	})

	data, _ := json.Marshal(models.Post{
		ID:        pID,
		Caption:   body.Caption,
		PostedBy:  s.UserID,
		Likes:     0,
		CreatedAt: createdAt,
	})

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func deletePost(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "postID")
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	var postedByID uint64
	row := db.QueryRow(`SELECT posted_by FROM posts WHERE id = $1 LIMIT 1`, postID)
	if err := row.Err(); err != nil {
		http.Error(w, "Post doesn't exist", http.StatusNotFound)
		return
	}
	if err := row.Scan(&postedByID); err != nil {
		http.Error(w, "Couldn't fetch post", http.StatusInternalServerError)
		return
	}

	if s.UserID != postedByID {
		http.Error(w, "Cannot delete post made by other users", http.StatusUnauthorized)
		return
	}

	baseDir := os.Getenv("MOSAICIFY_STORAGE_DIR")
	if baseDir == "" {
		log.Fatal().Msg("MOSAICIFY_STORAGE_DIR was not provided")
	}

	fpath := path.Join(baseDir, "posts", postID)
	if err := os.Remove(fpath); err != nil {
		http.Error(w, "Could not delete post image", http.StatusInternalServerError)
		return
	}

	tx, err := db.Beginx()
	if err != nil {
		http.Error(w, "Could not create a database transaction", http.StatusInternalServerError)
		return
	}

	_, err = tx.Exec(`DELETE FROM post_likes WHERE post_id = $1`, postID)
	if err != nil {
		http.Error(w, "Error deleting likes", http.StatusInternalServerError)
		return
	}

	_, err = tx.Exec(`DELETE FROM comments WHERE post_id = $1`, postID)
	if err != nil {
		http.Error(w, "Error deleting comments", http.StatusInternalServerError)
		return
	}

	_, err = tx.Exec(`DELETE FROM posts WHERE id = $1`, postID)
	if err != nil {
		http.Error(w, "Error deleting post record", http.StatusInternalServerError)
		return
	}

	err = tx.Commit()
	if err != nil {
		http.Error(w, "Couldn't commit database transaction", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
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

func deleteLike(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "postID")
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	tx, err := db.Beginx()
	if err != nil {
		http.Error(w, "Couldn't remove like", http.StatusInternalServerError)
		return
	}

	tx.Exec(`
		UPDATE posts
		SET likes = likes - 1
		WHERE id = $1
	`, postID)
	tx.Exec(`DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2`, postID, s.UserID)

	err = tx.Commit()
	if err != nil {
		http.Error(w, "Couldn't remove like", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Done"))
}

func doesUserLikePost(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "postID")
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if !ok {
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	result := false
	row := db.QueryRow(`SELECT EXISTS(SELECT * FROM post_likes WHERE post_id = $1 AND user_id = $2)`, postID, s.UserID)
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
