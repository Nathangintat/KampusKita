package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type VerifyRepository interface {
	Verify(ctx context.Context, nim string, kpId int64, imgType string) error
	GetAllVerifyRequest(ctx context.Context) ([]entity.GetVerifyEntity, error)
	ApproveVerifyRequest(ctx context.Context, nim string) error
	RejectVerifyRequest(ctx context.Context, nim string) error
}

type verifyRepository struct {
	db *gorm.DB
}

func (v *verifyRepository) Verify(ctx context.Context, nim string, kpId int64, imgType string) error {
	verif := model.Verify{
		Nim:        nim,
		KpID: 		kpId,
		ImgType: 	imgType,
		IsVerified: false,
	}

	err := v.db.WithContext(ctx).Create(&verif).Error
	if err != nil {
		code = "[REPOSITORY] Verify - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func (v *verifyRepository) GetAllVerifyRequest(ctx context.Context) ([]entity.GetVerifyEntity, error) {
	var data []entity.GetVerifyEntity

	err := v.db.Table("verify").
		Select(`
			users.id AS userId,
			nim,
			img_type,
			is_verified,
			kp_id,
			users.email,
			users.username
		`).
		Joins(`JOIN users ON verify.nim = users.verify_id`).
		Scan(&data).Error

	if err != nil {
		code = "[REPOSITORY] GetAllVerifyRequest - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return data, nil
}


func (v *verifyRepository) ApproveVerifyRequest(ctx context.Context, nim string) error {
	query := `
	UPDATE verify
	SET is_verified = true
	FROM users
	WHERE users.verify_id = verify.nim 
	AND nim = ?
	`

	err := v.db.Exec(query, nim).Error

	if err != nil {
		code = "[REPOSITORY] ApproveVerifyRequest - 1"
		log.Errorw(code, err)
		return  err
	}

	return nil
}

func (v *verifyRepository) RejectVerifyRequest(ctx context.Context, nim string) error {
	query := `
	DELETE FROM verify
	USING users
	WHERE users.verify_id = verify.nim 
	AND verify.nim = ?
	`

	err := v.db.Exec(query, nim).Error

	if err != nil {
		code = "[REPOSITORY] RejectVerifyRequest - 1"
		log.Errorw(code, err)
		return  err
	}

	return nil
}

func NewVerifyRepository(db *gorm.DB) VerifyRepository {
	return &verifyRepository{db: db}
}
