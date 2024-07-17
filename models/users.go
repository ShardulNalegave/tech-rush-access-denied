package models

type User struct {
	ID             uint64  `db:"id" json:"id"`
	Name           string  `db:"name" json:"name"`
	Email          string  `db:"email" json:"email"`
	Bio            *string `db:"bio" json:"bio"`
	ProfilePic     *string `db:"profile_pic" json:"profile_pic"`
	FollowerCount  uint64  `db:"follower_count" json:"follower_count"`
	FollowingCount uint64  `db:"following_count" json:"following_count"`
}
