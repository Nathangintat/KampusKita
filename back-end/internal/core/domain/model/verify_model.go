package model

type Verify struct {
	nim        string `gorm:"primaryKey;nim"`
	kampus     string `gorm:"kampus"`
	prodi      string `gorm:"prodi"`
	isVerified bool   `gorm:"is_verified"`
}
