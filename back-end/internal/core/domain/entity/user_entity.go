package entity

type UserEntity struct {
	ID       int64
	Email    string
	Username string
	VerifyId *string
}
