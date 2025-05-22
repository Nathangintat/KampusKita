package entity

import "time"

type ReviewDosen struct {
	ID           int64
	UserID       int64
	DosenID      int64
	Matkul       string
	Content      string
	Rating       int // 1-5
	CreatedAt    time.Time
	LikeCount    int
	DislikeCount int
	HasLiked     bool // Relasi dengan current user, diisi di service
	HasDisliked  bool // sama
}
