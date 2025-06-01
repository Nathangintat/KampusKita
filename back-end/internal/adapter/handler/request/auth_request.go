package request

type LoginRequest struct {
	GoogleIdToken string `json:"google_id_token" validate:"required"`
}
