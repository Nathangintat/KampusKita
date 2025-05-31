package entity

import "time"

type ReviewDosenEntity struct {
	ID        uint
	UserID    uint
	DosenID   uint
	Matkul    string
	Content   string
	Rating    int
	CreatedAt time.Time
}

type ReviewDosenItemEntity struct {
	KampusID int64
	Nama     string
}
