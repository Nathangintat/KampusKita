package response

type RankingKampusResponse struct {
	KampusID    uint   `json:"kampus_id"`
	Ranking     int    `json:"ranking"`
	Nama        string `json:"nama"`
	NamaSingkat string `json:"nama_singkat"`
}
