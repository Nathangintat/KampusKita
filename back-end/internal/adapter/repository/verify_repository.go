package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type VerifyRepository interface {
	Verify(ctx context.Context, req entity.VerifyEntity) error
}

type verifyRepository struct {
	db *gorm.DB
}

func (v *verifyRepository) Verify(ctx context.Context, req entity.VerifyEntity) error {

	verif := model.Verify{
		Nim:        req.Nim,
		Kampus:     req.Kampus,
		Prodi:      req.Prodi,
		IsVerified: req.IsVerified,
	}

	err := v.db.WithContext(ctx).Create(&verif).Error
	if err != nil {
		code = "[REPOSITORY] Verify - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func NewVerifyRepository(db *gorm.DB) VerifyRepository {
	return &verifyRepository{db: db}
}
