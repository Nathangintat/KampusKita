package response

import "time"

type RatingDosenResponse struct {
	KampusID int64                 `json:"kampusId"`
	Nama     string                `json:"nama"`
	Rating   []ReviewDosenResponse `json:"rating"`
}

type ReviewDosenResponse struct {
	ReviewID    uint      `json:"reviewId"`
	Date        time.Time `json:"date"`
	Content     string    `json:"content"`
	Rating 		int   	  `json:"rating"`
	Matkul      string    `json:"matkul"`
	Like        int64     `json:"like"`
	Dislike     int64     `json:"dislike"`
	HasLiked    bool      `json:"hasLiked"`
	HasDisliked bool      `json:"hasDisliked"`
}
