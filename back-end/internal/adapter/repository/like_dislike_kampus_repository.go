package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type LikeDislikeKampusRepository interface {
	AddLikeKampus(ctx context.Context, reviewID, userID int64) error
	AddDislikeKampus(ctx context.Context, reviewID, userID int64) error
}

type likeDislikeKampusRepository struct {
	db *gorm.DB
}

func (l *likeDislikeKampusRepository) AddLikeKampus(ctx context.Context, reviewID, userID int64) error {
	return l.db.WithContext(ctx).Transaction(func(db *gorm.DB) error {

		db.Where("rk_id = ? AND user_id = ?", reviewID, userID).Delete(&model.DislikeRKMap{})

		var exists bool
		err := db.Model(&model.LikeRKMap{}).
			Select("count(*) > 0").
			Where("rk_id = ? AND user_id = ?", reviewID, userID).
			Find(&exists).Error

		if err != nil {
			code = "[REPOSITORY] AddLikeKampus - 1"
			log.Errorw(code, err)
			return err
		}

		if !exists {
			if err := db.Create(&model.LikeRKMap{
				RkID:   uint(reviewID),
				UserID: uint(userID),
			}).Error; err != nil {
				return err
			}
		} else {
			err := db.Where("rk_id = ? AND user_id = ?", reviewID, userID).Delete(&model.LikeRKMap{}).Error
			if err != nil {
				code = "[REPOSITORY] AddLikeKampus - 2"
				log.Errorw(code, err)
				return err
			}
		}
		return err
	})
}

func (l *likeDislikeKampusRepository) AddDislikeKampus(ctx context.Context, reviewID, userID int64) error {
	return l.db.WithContext(ctx).Transaction(func(db *gorm.DB) error {

		db.Where("rk_id = ? AND user_id = ?", reviewID, userID).Delete(&model.LikeRKMap{})

		var exists bool
		err := db.Model(&model.DislikeRKMap{}).
			Select("count(*) > 0").
			Where("rk_id = ? AND user_id = ?", reviewID, userID).
			Find(&exists).Error

		if err != nil {
			code = "[REPOSITORY] AddDislikeKampus - 1"
			log.Errorw(code, err)
			return err
		}

		if !exists {
			if err := db.Create(&model.DislikeRKMap{
				RkID:   uint(reviewID),
				UserID: uint(userID),
			}).Error; err != nil {
				return err
			}
		} else {
			err := db.Where("rk_id = ? AND user_id = ?", reviewID, userID).Delete(&model.DislikeRKMap{}).Error
			if err != nil {
				code = "[REPOSITORY] AddDislikeKampus - 2"
				log.Errorw(code, err)
				return err
			}
		}
		return err
	})
}

func NewLikeDislikeKampusRepository(db *gorm.DB) LikeDislikeKampusRepository {
	return &likeDislikeKampusRepository{db: db}
}
