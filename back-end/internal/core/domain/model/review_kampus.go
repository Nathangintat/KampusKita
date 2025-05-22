package model

import "time"

type ReviewKampus struct {
	ID              uint      `gorm:"id"`
	UserID          uint      `gorm:"user_id"`
	KpID            *uint     `gorm:"kp_id"`
	Content         string    `gorm:"content"`
	RatingFasilitas int       `gorm:"rating_fasilitas"`
	RatingInternet  int       `gorm:"rating_internet"`
	RatingLokasi    int       `gorm:"rating_lokasi"`
	RatingOrmawa    int       `gorm:"rating_ormawa"`
	RatingWorthIt   int       `gorm:"rating_worth_it"`
	CreatedAt       time.Time `gorm:"created_at"`

	User  User   `gorm:"UserID"`
	KPMap *KPMap `gorm:"KpID"`
}
