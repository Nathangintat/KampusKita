package model

type KPMap struct {
	ID       uint   `gorm:"id"`
	KampusId uint   `gorm:"kampus_id"`
	ProdiId  uint   `gorm:"prodi_id"`
	Kampus   Kampus `gorm:"foreignKey:KampusId"`
	Prodi    Prodi  `gorm:"foreignKey:ProdiId"`
}
