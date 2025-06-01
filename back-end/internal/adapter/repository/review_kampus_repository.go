package repository

import (
	"context"
	"fmt"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type ReviewKampusRepository interface {
	GetRatingKampusByID(ctx context.Context, id int64) (*entity.RatingKampusEntity, error)
	CreateReviewKampus(ctx context.Context, req entity.ReviewKampusEntity) error
	GetReviewKampusByID(ctx context.Context, kampusID, userID int64) ([]entity.ReviewKampusItemEntity, error)
}
type reviewKampusRepository struct {
	db *gorm.DB
}

func (rk *reviewKampusRepository) GetReviewKampusByID(ctx context.Context, kampusID, userID int64) ([]entity.ReviewKampusItemEntity, error) {
	var results []entity.ReviewKampusItemEntity
	err := rk.db.Table("review_kampus").
		Select(`
			id AS review_id,
			created_at AS date,
			content,
			rating_fasilitas,
			rating_internet,
			rating_lokasi,
			rating_ormawa,
			rating_worth_it ,
			COALESCE((SELECT COUNT(*) FROM like_rk_map WHERE rk_id = review_kampus.id), 0) AS like,
			COALESCE((SELECT COUNT(*) FROM dislike_rk_map WHERE rk_id = review_kampus.id), 0) AS dislike,
			COALESCE((SELECT COUNT(*) FROM like_rk_map WHERE rk_id = review_kampus.id AND user_id = ?), 0) > 0 AS has_liked,
			COALESCE((SELECT COUNT(*) FROM dislike_rk_map WHERE rk_id = review_kampus.id AND user_id = ?), 0) > 0 AS has_disliked
		`, userID, userID).
		Where("kp_id = ?", kampusID).
		Order("created_at DESC").
		Scan(&results).Error

	fmt.Println(results)

	if err != nil {
		code = "[REPOSITORY] GetReviewKampusByID - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return results, nil
}

func (rk *reviewKampusRepository) CreateReviewKampus(ctx context.Context, req entity.ReviewKampusEntity) error {

	review := model.ReviewKampus{
		ID:              uint(req.ID),
		UserID:          uint(req.UserID),
		KpID:            uint(req.KPMapID),
		Content:         req.Content,
		RatingFasilitas: req.RatingFasilitas,
		RatingInternet:  req.RatingInternet,
		RatingLokasi:    req.RatingLokasi,
		RatingOrmawa:    req.RatingOrmawa,
		RatingWorthIt:   req.RatingWorthIt,
		CreatedAt:       req.CreatedAt,
	}

	err := rk.db.WithContext(ctx).Create(&review).Error
	if err != nil {
		code = "[REPOSITORY] CreateReviewKampus - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func (rk *reviewKampusRepository) GetRatingKampusByID(ctx context.Context, id int64) (*entity.RatingKampusEntity, error) {
	var result entity.RatingKampusEntity

	err := rk.db.Table("review_kampus").
		Select(`
			AVG(rating_fasilitas) as fasilitas,
			AVG(rating_internet) as wifi,
			AVG(rating_lokasi) as lokasi,
			AVG(rating_ormawa) as organisasi,
			AVG(rating_worth_it) as worth_it,
			AVG(
				rating_fasilitas + rating_internet + rating_lokasi + rating_ormawa + rating_worth_it
			) / 5 as total
		`).
		Where("kp_id = ?", id).
		Scan(&result).Error

	if err != nil {
		code = "[REPOSITORY] GetRatingKampusByID - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return &result, nil
}

func NewReviewKampusRepository(db *gorm.DB) ReviewKampusRepository {
	return &reviewKampusRepository{db: db}
}
