package model

type Prodi struct {
	ID   uint   `gorm:"id"`
	Nama string `gorm:"nama"`
}

func (Prodi) TableName() string {
	return "prodi"
}
