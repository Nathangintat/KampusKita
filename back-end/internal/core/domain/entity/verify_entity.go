package entity

type VerifyEntity struct {
	UserID 	   int64
	Nim        string
	ImgType    string
	Kampus     int64
	Prodi      int64
	IsVerified bool
}

type GetVerifyEntity struct {
	UserID 	   int64
	Nim        string
	ImgType    string
	IsVerified bool
	KpID       int64
	Email	   string
	Username   string
}
