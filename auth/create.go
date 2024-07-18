package auth

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/ShardulNalegave/tech-rush-access-denied/sessions"
	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	_, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	if ok {
		http.Error(w, "Already logged in. Please logout first", http.StatusUnauthorized)
		return
	}

	var body struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body provided", http.StatusBadRequest)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), BCRYPT_COST)
	if err != nil {
		http.Error(w, "Could not hash provided password", http.StatusBadRequest)
		return
	}

	res := db.QueryRow("INSERT INTO users(name, email, password_hash) VALUES ($1, $2, $3) RETURNING id;", body.Name, body.Email, string(hash))
	if res.Err() != nil {
		var pqError *pq.Error
		if errors.As(err, &pqError) && pqError.SQLState() == "23505" {
			http.Error(w, "User with provided email already exists!", http.StatusBadRequest)
			return
		}
		http.Error(w, "Could not create new user", http.StatusInternalServerError)
		return
	}

	var id uint64
	res.Scan(&id)

	data, err := json.Marshal(struct {
		ID    uint64 `json:"id"`
		Name  string `json:"name"`
		Email string `json:"email"`
	}{
		ID:    id,
		Name:  body.Name,
		Email: body.Email,
	})

	if err != nil {
		http.Error(w, "JSON Marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
