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
	GetUserByEmail(ctx context.Context, req entity.LoginGmail) (*entity.UserEntity, error)
	CreateNewUser(ctx context.Context, req entity.UserEntity) error
}

type authRepository struct {
	db *gorm.DB
}

func (a *authRepository) CreateNewUser(ctx context.Context, req entity.UserEntity) error {

	user := model.User{
		Email:    req.Email,
		Username: req.Username,
		VerifyID: req.VerifyId,
	}

	err := a.db.WithContext(ctx).Create(&user).Error
	if err != nil {
		return err
	}
	return err
}

func (a *authRepository) GetUserByEmail(ctx context.Context, req entity.LoginGmail) (*entity.UserEntity, error) {
	var modelUser model.User

	err = a.db.Where("email = ?", req.Email).First(&modelUser).Error
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
