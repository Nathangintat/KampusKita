package model

type DislikeRDMap struct {
	RdID   uint `gorm:"review_id"`
	UserID uint `gorm:"user_id"`

	ReviewDosen ReviewDosen `gorm:"foreignKey:RdID"`
	User        User        `gorm:"foreignKey:UserID"`
}

func (DislikeRDMap) TableName() string {
	return "dislike_rd_map"
}
