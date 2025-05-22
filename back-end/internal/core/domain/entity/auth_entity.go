package entity

type LoginRequest struct {
	GoogleIdToken string
}

type ChangeUsernameRequest struct {
	NewUsername string
}

type AccessToken struct {
	Token     string
	ExpiresAt int64
}
