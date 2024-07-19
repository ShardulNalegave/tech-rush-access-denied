package models

type Comment struct {
	ID      uint64 `db:"id" json:"id"`
	PostID  uint64 `db:"post_id" json:"post_id"`
	UserID  uint64 `db:"user_id" json:"user_id"`
	Content string `db:"content" json:"content"`
}
