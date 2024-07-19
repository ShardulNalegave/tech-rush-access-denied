package models

type User struct {
	ID             uint64  `db:"id" json:"id"`
	PasswordHash   string  `db:"password_hash" json:"-"`
	Name           string  `db:"name" json:"name"`
	Email          string  `db:"email" json:"email"`
	Bio            *string `db:"bio" json:"bio"`
	About          *string `db:"about" json:"about"`
	FollowerCount  uint64  `db:"follower_count" json:"follower_count"`
	FollowingCount uint64  `db:"following_count" json:"following_count"`
}
