package model

type User struct {
	ID       int64   `gorm:"id"`
	Username string  `gorm:"username"`
	Email    string  `gorm:"email"`
	VerifyID *string `gorm:"verify_id"`
	Verify   *Verify `gorm:"foreignKey:VerifyID;references:NIM"`
}
