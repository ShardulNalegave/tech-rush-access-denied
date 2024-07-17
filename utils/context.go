package utils

type contextKey struct {
	name string
}

var DatabaseKey = &contextKey{name: "Database"}
