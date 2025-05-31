package response

type RatingKampusResponse struct {
	Fasilitas  float64 `json:"fasilitas"`
	Wifi       float64 `json:"wifi"`
	Lokasi     float64 `json:"lokasi"`
	Organisasi float64 `json:"organisasi"`
	WorthIt    float64 `json:"worthIt"`
	Total      float64 `json:"total"`
}
