package entity

type LoginRequest struct {
	GoogleIdToken string
}

type LoginGmail struct {
	Email string
}

type ChangeUsernameRequest struct {
	NewUsername string
}

type AccessToken struct {
	AccessToken string
	ExpiresAt   int64
	Username 	string
}
