package sessions

import (
	"context"
	"net/http"

	"github.com/ShardulNalegave/tech-rush-access-denied/utils"
)

func SessionManagerMiddleware(sm *SessionManager) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := context.WithValue(r.Context(), utils.SessionManagerKey, sm)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
