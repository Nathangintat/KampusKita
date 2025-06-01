package repository

import (
	"context"
	"fmt"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type ReviewDosenRepository interface {
	CreateReviewDosen(ctx context.Context, reviewDosen entity.ReviewDosenEntity) error
	GetReviewDosenByID(ctx context.Context, dosenId, userid int64) (*entity.ReviewDosenItemEntity, []entity.RatingDosenEntity, error)
}

type reviewDosenRepository struct {
	db *gorm.DB
}

func (rd *reviewDosenRepository) CreateReviewDosen(ctx context.Context, req entity.ReviewDosenEntity) error {

	review := model.ReviewDosen{
		ID:        req.ID,
		UserID:    req.UserID,
		DosenID:   req.DosenID,
		Matkul:    req.Matkul,
		Content:   req.Content,
		Rating:    req.Rating,
		CreatedAt: req.CreatedAt,
	}

	err := rd.db.WithContext(ctx).Create(&review).Error
	if err != nil {
		code = "[REPOSITORY] CreateReviewDosen - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func (rd *reviewDosenRepository) GetReviewDosenByID(ctx context.Context, dosenId, userId int64) (*entity.ReviewDosenItemEntity, []entity.RatingDosenEntity, error) {
	dosen := entity.ReviewDosenItemEntity{}

	err := rd.db.Table("dosen").
		Select("dosen.kp_id AS kampus_id, dosen.nama").
		Where("dosen.id = ?", dosenId).
		Scan(&dosen).Error

	if err != nil {
		code = "[REPOSITORY] GetReviewDosenById - 1"
		log.Errorw(code, err)
		return nil, nil, err
	}

	var reviews []entity.RatingDosenEntity
	err = rd.db.Table("review_dosen").
		Select(`
		id AS review_id,
		created_at AS date,
		content,
		matkul,
		COALESCE((SELECT COUNT(*) FROM like_rd_map WHERE rd_id = review_dosen.id), 0) AS like_count,
		COALESCE((SELECT COUNT(*) FROM dislike_rd_map WHERE rd_id = review_dosen.id), 0) AS dislike_count,
		COALESCE((SELECT COUNT(*) FROM like_rd_map WHERE rd_id = review_dosen.id AND user_id = ?), 0) > 0 AS has_liked,
		COALESCE((SELECT COUNT(*) FROM dislike_rd_map WHERE rd_id = review_dosen.id AND user_id = ?), 0) > 0 AS has_disliked
	`, userId, userId).
		Where("dosen_id = ?", dosenId).
		Order("created_at DESC").
		Scan(&reviews).Error

	if err != nil {
		code = "[REPOSITORY] GetReviewDosenById - 2"
		log.Errorw(code, err)
		return nil, nil, err
	}

	fmt.Println(reviews)

	resp := &entity.ReviewDosenItemEntity{
		KampusID: dosen.KampusID,
		Nama:     dosen.Nama,
	}

	return resp, reviews, nil
}

func NewReviewDosenRepository(db *gorm.DB) ReviewDosenRepository {
	return &reviewDosenRepository{db: db}
}
