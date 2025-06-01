package request

type ReviewDosenRequest struct {
	UserID  uint   `json:"user_id"`
	DosenID uint   `json:"dosen_id"`
	Matkul  string `json:"matkul"`
	Content string `json:"content"`
	Rating  int    `json:"rating"`
}
