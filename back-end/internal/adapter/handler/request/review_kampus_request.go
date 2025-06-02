package request

type ReviewKampusRequest struct {
	KampusId   string `json:"kampus_id"`
	Fasilitas  int    `json:"fasilitas"`
	Wifi       int    `json:"wifi"`
	Lokasi     int    `json:"lokasi"`
	Organisasi int    `json:"organisasi"`
	WorthIt    int    `json:"worthIt"`
	Content    string `json:"content"`
}
