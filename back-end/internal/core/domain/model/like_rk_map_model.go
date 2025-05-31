package model

type LikeRKMap struct {
	RkID   uint `gorm:"rk_id"`
	UserID uint `gorm:"user_id"`

	ReviewKampus ReviewKampus `gorm:"foreignKey:RkID"`
	User         User         `gorm:"foreignKey:UserID"`
}

func (LikeRKMap) TableName() string {
	return "like_rk_map"
}
