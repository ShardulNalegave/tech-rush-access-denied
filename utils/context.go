package utils

type contextKey struct {
	name string
}

var DatabaseKey = &contextKey{name: "Database"}
var SessionManagerKey = &contextKey{name: "SesionManager"}
var AuthKey = &contextKey{name: "Auth"}
var SecureCookieKey = &contextKey{name: "SecureCookie"}
