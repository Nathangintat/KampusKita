package model

type LikeRDMap struct {
	RdID   uint `gorm:"rd_id"`
	UserID uint `gorm:"user_id"`

	ReviewDosen ReviewDosen `gorm:"foreignKey:RdID"`
	User        User        `gorm:"foreignKey:UserID"`
}

func (LikeRDMap) TableName() string {
	return "like_rd_map"
}
