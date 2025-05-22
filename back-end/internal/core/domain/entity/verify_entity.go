package entity

type Verify struct {
	NIM        string
	Kampus     string
	Fakultas   string
	IsVerified bool
	// KTM image disimpan di filesystem, path bisa disimpan di service layer
}
