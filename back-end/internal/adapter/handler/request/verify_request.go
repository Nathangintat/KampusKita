package request

type VerifyRequest struct {
	Nim        string `json:"nim"`
	Kampus     string `json:"kampus"`
	Prodi      string `json:"prodi"`
	IsVerified bool   `json:"is_verified"`
}
