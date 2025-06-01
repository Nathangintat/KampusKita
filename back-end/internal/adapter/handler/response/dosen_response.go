package response

type DosenResponse struct {
	ID     uint    `json:"id"`
	Nama   string  `json:"nama"`
	KpId   uint    `json:"kp_id"`
	Rating float64 `json:"rating"`
	Prodi  string  `json:"prodi"`
	Kampus string  `json:"kampus"`
}

type DosenItemResponse struct {
	DosenID uint    `json:"dosenId"`
	Rating  float64 `json:"rating"`
	Nama    string  `json:"nama"`
	Prodi   string  `json:"prodi"`
}

type SearchDosenItemResponse struct {
	DosenID uint    `json:"dosenId"`
	Rating  float64 `json:"rating"`
	Nama    string  `json:"nama"`
	Prodi   string  `json:"prodi"`
	Kampus  string  `json:"kampus"`
}
