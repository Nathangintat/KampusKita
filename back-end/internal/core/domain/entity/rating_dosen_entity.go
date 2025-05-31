package entity

import "time"

type RatingDosenEntity struct {
	ReviewID     uint
	Date         time.Time
	Matkul       string
	Content      string
	LikeCount    int64
	DislikeCount int64
	HasLiked     bool
	HasDisliked  bool
}
