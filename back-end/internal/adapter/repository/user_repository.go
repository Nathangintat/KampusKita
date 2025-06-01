package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type UserRepository interface {
	DeleteUserByID(ctx context.Context, id int64) error
	ChangeUsername(ctx context.Context, id int64, username string) (int64, error)
}

type userRepository struct {
	db *gorm.DB
}

func (u *userRepository) DeleteUserByID(ctx context.Context, id int64) error {
	err = u.db.Where("id = ?", id).Delete(&model.User{}).Error
	if err != nil {
		code = "[REPOSITORY] DeleteUserByID - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func (u *userRepository) ChangeUsername(ctx context.Context, id int64, username string) (int64, error) {
	err = u.db.Model(&model.User{}).Where("id = ?", id).Update("username", username).Error
	if err != nil {
		code = "[REPOSITORY] ChangeUsernane - 1"
		log.Errorw(code, err)
		return 0, err
	}
	return id, nil
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}
