package models

type Post struct {
	ID       uint64 `db:"id" json:"id"`
	PostedBy uint64 `db:"posted_by" json:"posted_by"`
	Likes    uint64 `db:"likes" json:"likes"`
	Caption  string `db:"caption" json:"caption"`
}
