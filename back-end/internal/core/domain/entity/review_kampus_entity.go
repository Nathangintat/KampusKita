package entity

import "time"

type ReviewKampusEntity struct {
	ID              int64
	UserID          int64
	KPMapID         int64
	Content         string
	RatingFasilitas int
	RatingInternet  int
	RatingLokasi    int
	RatingOrmawa    int
	RatingWorthIt   int
	CreatedAt       time.Time
}

type ReviewKampusItemEntity struct {
	ReviewID        int64
	Date            time.Time
	Content         string
	Like            int
	Dislike         int
	HasLiked        bool
	HasDisliked     bool
	RatingFasilitas int
	RatingInternet  int
	RatingLokasi    int
	RatingOrmawa    int
	RatingWorthIt   int
}

type CheckKampusMatchEntity struct {
	Email 		string
	Matches 	bool
	KampusID 	uint
}
