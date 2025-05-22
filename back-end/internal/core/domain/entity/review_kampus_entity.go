package entity

import "time"

type ReviewKampus struct {
	ID              int64
	UserID          int64
	KPMapID         *int64 // nullable
	Content         string
	RatingFasilitas int // 1-5
	RatingInternet  int // 1-5
	RatingLokasi    int // 1-5
	RatingOrmawa    int // 1-5
	RatingWorthIt   int // 1-5
	CreatedAt       time.Time
	LikeCount       int
	DislikeCount    int
	HasLiked        bool
	HasDisliked     bool
}
