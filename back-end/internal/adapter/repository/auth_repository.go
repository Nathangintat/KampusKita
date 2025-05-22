package repository

import (
	"context"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"

	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

var err error
var code string

type AuthRepository interface {
	GetUserByEmail(ctx context.Context, req entity.LoginRequest) (*entity.UserEntity, error)
}

type authRepository struct {
	db *gorm.DB
}

// GetUserByEmail implements AuthRepository.
func (a *authRepository) GetUserByEmail(ctx context.Context, req entity.LoginRequest) (*entity.UserEntity, error) {
	var modelUser model.User

	err = a.db.Where("email = ?", req.GoogleIdToken).First(&modelUser).Error
	if err != nil {
		code = "[REPOSITORY] GetUserByEmail - 1"
		log.Errorw(code, err)
		return nil, err
	}

	resp := entity.UserEntity{
		ID:       modelUser.ID,
		Username: modelUser.Username,
		Email:    modelUser.Email,
		VerifyId: modelUser.VerifyID,
	}

	return &resp, nil
}

func NewAuthRepository(db *gorm.DB) AuthRepository {
	return &authRepository{db: db}
}
