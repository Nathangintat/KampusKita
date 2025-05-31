package model

type Verify struct {
	Nim        string `gorm:"primaryKey"`
	Kampus     string `gorm:"kampus"`
	Prodi      string `gorm:"prodi"`
	IsVerified bool   `gorm:"is_verified"`
}

func (Verify) TableName() string {
	return "verify"
}
