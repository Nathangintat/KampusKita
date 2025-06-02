package request

type ReviewDosenRequest struct {
	DosenID string `json:"dosen_id"`
	Matkul  string `json:"matkul"`
	Content string `json:"content"`
	Rating  int    `json:"rating"`
}
