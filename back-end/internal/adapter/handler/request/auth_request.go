package request

type LoginRequest struct {
	GoogleIdToken string `json:"google_id_token" validate:"required"`
}

type ChangeUsernameRequest struct {
	NewUsername string `json:"new_username" validate:"required"`
}
