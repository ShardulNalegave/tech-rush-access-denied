package auth

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/ShardulNalegave/tech-rush-access-denied/models"
	"github.com/ShardulNalegave/tech-rush-access-denied/sessions"
	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
	"github.com/gorilla/securecookie"
	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	sm := r.Context().Value(utils.SessionManagerKey).(*sessions.SessionManager)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)
	sc := r.Context().Value(utils.SecureCookieKey).(*securecookie.SecureCookie)

	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body provided", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.Get(&user, "SELECT id, password_hash FROM users WHERE email = $1", body.Email); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "No user with the provided email exists", http.StatusBadRequest)
			return
		}

		http.Error(w, "Error fetching user record", http.StatusInternalServerError)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(body.Password)); err != nil {
		http.Error(w, "Invalid password provided", http.StatusBadRequest)
		return
	}

	s, err := sm.NewSession(user.ID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Could not create a new session", http.StatusInternalServerError)
		return
	}

	encoded, err := sc.Encode(COOKIE_NAME, *s)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Could not create a new session", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     COOKIE_NAME,
		Value:    encoded,
		Path:     "/",
		HttpOnly: true,
		MaxAge:   COOKIE_DURATION,
	})

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}
