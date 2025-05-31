package request

type ChangeUsernameRequest struct {
	NewUsername string `json:"new_username" validate:"required"`
}
