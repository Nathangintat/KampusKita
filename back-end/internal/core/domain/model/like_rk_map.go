package model

type LikeRKMap struct {
	RkID   uint `gorm:"rk_id"`
	UserID uint `gorm:"user_id"`

	ReviewKampus ReviewKampus `gorm:"foreignKey:RkID"`
	User         User         `gorm:"foreignKey:UserID"`
}
