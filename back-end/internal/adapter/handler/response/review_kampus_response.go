package response

import (
	"time"
)

type ReviewKampusItemResponse struct {
	ReviewID    int64                       `json:"reviewId"`
	Date        time.Time                   `json:"date"`
	Content     string                      `json:"content"`
	Like        int                         `json:"like"`
	Dislike     int                         `json:"dislike"`
	HasLiked    bool                        `json:"hasLiked"`
	HasDisliked bool                        `json:"hasDisliked"`
	Rating      *RatingReviewKampusResponse `json:"rating"`
}

type RatingReviewKampusResponse struct {
	Fasilitas  float64 `json:"fasilitas"`
	Wifi       float64 `json:"wifi"`
	Lokasi     float64 `json:"lokasi"`
	Organisasi float64 `json:"organisasi"`
	WorthIt    float64 `json:"worth_it"`
}
