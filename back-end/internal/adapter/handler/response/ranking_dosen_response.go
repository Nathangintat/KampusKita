package response

type RankingDosenResponse struct {
	DosenID uint   `json:"dosenId"`
	Ranking int    `json:"ranking"`
	Nama    string `json:"nama"`
	Kampus  string `json:"kampus"`
}
