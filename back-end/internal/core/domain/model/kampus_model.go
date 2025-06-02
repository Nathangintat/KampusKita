package model

type Kampus struct {
	ID          uint   `gorm:"id"`
	Nama        string `gorm:"nama"`
	NamaSingkat string `gorm:"nama_singkat"`
	Akreditasi  string `gorm:"akreditasi"`
}

type KampusComplete struct {
	Kampus
	JumlahDosen uint
}
