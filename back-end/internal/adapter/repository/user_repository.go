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
	ChangeNim(ctx context.Context, id int64, nim string) (int64, error)
	GetVerifyStatus(ctx context.Context, id int64) (*model.VerifyStatus, error)
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

func (u *userRepository) GetVerifyStatus(ctx context.Context, id int64) (*model.VerifyStatus, error) {
	var verifyStatus model.VerifyStatus

	err := u.db.Table("users").
		Select(`
		CASE verify.is_verified
			WHEN true THEN 'Verified'
			WHEN false THEN 'Pending'
			ELSE 'NotVerified'
		END as status
		`).
		Joins("LEFT JOIN verify ON verify.nim = users.verify_id").
		Where("users.id = ?", id).
		Limit(1).
		Scan(&verifyStatus).Error

	if err != nil {
		code = "[REPOSITORY] GetVerifyStatus - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return &verifyStatus, err
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

func (u *userRepository) ChangeNim(ctx context.Context, id int64, nim string) (int64, error) {
	err = u.db.Model(&model.User{}).Where("id = ?", id).Update("verify_id", nim).Error
	if err != nil {
		code = "[REPOSITORY] ChangeNim - 1"
		log.Errorw(code, err)
		return 0, err
	}
	return id, nil
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}
