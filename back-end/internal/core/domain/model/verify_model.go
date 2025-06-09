package model

type Verify struct {
	Nim        	string `gorm:"primaryKey"`
	KpID     	int64  `gorm:"kp_id"`
	IsVerified 	bool   `gorm:"is_verified"`
	KPID   		*KPMap `gorm:"foreignKey:KpID; references:ID"`
}

type VerifyStatus struct {
	Status      string `gorm:"status"`
}

func (Verify) TableName() string {
	return "verify"
}
