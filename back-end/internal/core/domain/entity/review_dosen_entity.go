package entity

import "time"

type ReviewDosenEntity struct {
	ID        uint
	UserID    uint
	DosenID   uint
	Matkul    string
	Content   string
	Rating    int
	CreatedAt time.Time
}

type ReviewDosenItemEntity struct {
	KampusID int64
	Nama     string
}

type CheckVerifiedUserEntity struct {
	Email 			string
	VerifyStatus 	bool
}

type CheckKpMatchEntity struct {
	Email 		string
	KpMatches 	bool
	DosenID 	uint
}

type CheckAlreadyReviewedEntity struct {
	Count int64
}
