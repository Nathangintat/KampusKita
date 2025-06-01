package response

type KampusResponse struct {
	ID          int64  `json:"id"`
	Nama        string `json:"nama"`
	NamaSingkat string `json:"nama_singkat"`
	Akreditasi  string `json:"akreditasi"`
}

type KampusByIdResponse struct {
	KampusID   int64                 `json:"kampusId"`
	Nama       string                `json:"nama"`
	Akreditasi string                `json:"akreditasi"`
	Rating     *RatingKampusResponse `json:"rating"`
}

type SearchKampusItemResponse struct {
	KampusID    int64                 `json:"kampusId"`
	Rating      *RatingKampusResponse `json:"rating"`
	Nama        string                `json:"nama"`
	NamaSingkat string                `json:"nama_singkat"`
}
