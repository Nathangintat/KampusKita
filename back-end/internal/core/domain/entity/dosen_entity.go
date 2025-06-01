package entity

type DosenEntity struct {
	ID     uint
	Nama   string
	KpId   uint
	Rating float64
	Prodi  string
	Kampus string
}

type DosenItemEntity struct {
	DosenId uint
	Rating  float64
	Nama    string
	Prodi   string
}

type SearchDosenEntity struct {
	DosenId uint
	Rating  float64
	Nama    string
	Prodi   string
	Kampus  string
}
