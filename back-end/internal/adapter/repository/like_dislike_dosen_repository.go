package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type LikeDislikeDosenRepository interface {
	AddLikeDosen(ctx context.Context, reviewID, userID int64) error
	AddDislikeDosen(ctx context.Context, reviewID, userID int64) error
}

type likeDislikeDosenRepository struct {
	db *gorm.DB
}

func (l *likeDislikeDosenRepository) AddLikeDosen(ctx context.Context, reviewID, userID int64) error {
	return l.db.WithContext(ctx).Transaction(func(db *gorm.DB) error {

		db.Where("rd_id = ? AND user_id = ?", reviewID, userID).Delete(&model.DislikeRDMap{})

		var exists bool
		err := db.Model(&model.LikeRDMap{}).
			Select("count(*) > 0").
			Where("rd_id = ? AND user_id = ?", reviewID, userID).
			Find(&exists).Error

		if err != nil {
			code = "[REPOSITORY] AddLikeDosen - 1"
			log.Errorw(code, err)
			return err
		}

		if !exists {
			if err := db.Create(&model.LikeRDMap{
				RdID:   uint(reviewID),
				UserID: uint(userID),
			}).Error; err != nil {
				return err
			}
		}
		return err
	})
}

func (l *likeDislikeDosenRepository) AddDislikeDosen(ctx context.Context, reviewID, userID int64) error {
	return l.db.WithContext(ctx).Transaction(func(db *gorm.DB) error {

		db.Where("rd_id = ? AND user_id = ?", reviewID, userID).Delete(&model.LikeRDMap{})

		var exists bool
		err := db.Model(&model.DislikeRDMap{}).
			Select("count(*) > 0").
			Where("rd_id = ? AND user_id = ?", reviewID, userID).
			Find(&exists).Error

		if err != nil {
			code = "[REPOSITORY] AddDislikeDosen - 1"
			log.Errorw(code, err)
			return err
		}

		if !exists {
			if err := db.Create(&model.DislikeRDMap{
				RdID:   uint(reviewID),
				UserID: uint(userID),
			}).Error; err != nil {
				return err
			}
		}
		return err
	})
}

func NewLikeDislikeDosenRepository(db *gorm.DB) LikeDislikeDosenRepository {
	return &likeDislikeDosenRepository{db: db}
}
