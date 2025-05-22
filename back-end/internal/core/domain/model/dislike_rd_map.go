package model

type DislikeRDMap struct {
	RdID   uint `gorm:"review_id"`
	UserID uint `gorm:"user_id"`

	ReviewDosen ReviewDosen `gorm:"foreignKey:RdID"`
	User        User        `gorm:"foreignKey:UserID"`
}
