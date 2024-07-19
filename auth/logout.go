package auth

import (
	"net/http"

	"github.com/ShardulNalegave/tech-rush-access-denied/sessions"
	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
)

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	s, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
	sm := r.Context().Value(utils.SessionManagerKey).(*sessions.SessionManager)

	if !ok {
		http.Error(w, "No user logged in", http.StatusUnauthorized)
		return
	}

	if err := sm.DeleteSession(s.SessionID); err != nil {
		http.Error(w, "Could not log out", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     COOKIE_NAME,
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	})

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}
