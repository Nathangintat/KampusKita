package model

import "time"

type ReviewDosen struct {
	ID        uint      `gorm:"id"`
	UserID    uint      `gorm:"user_id"`
	DosenID   uint      `gorm:"dosen_id"`
	Matkul    string    `gorm:"matkul"`
	Content   string    `gorm:"content"`
	Rating    int       `gorm:"rating"`
	CreatedAt time.Time `gorm:"created_at"`

	User  User  `gorm:"foreignKey:UserID;references:ID"`
	Dosen Dosen `gorm:"foreignKey:DosenID;"`
}

func (ReviewDosen) TableName() string {
	return "review_dosen"
}
