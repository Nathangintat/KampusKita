package entity

type Dosen struct {
	ID      int64
	Nama    string
	KPMapID *int64 // nullable, foreign key ke KampusProdiMap
}
