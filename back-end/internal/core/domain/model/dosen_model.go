package model

type Dosen struct {
	ID    uint   `gorm:"id"`
	Nama  string `gorm:"nama"`
	KpId  *uint  `gorm:"kp_id"`
	KPMap *KPMap `gorm:"foreignKey:KpId;"`
}
