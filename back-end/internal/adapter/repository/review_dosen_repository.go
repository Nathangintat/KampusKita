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
	GetReviewStatusByID(ctx context.Context, dosenId, userId int64) (string, error)
	GetReviewData(ctx context.Context, dosenId, userId int64) (*entity.ReviewDosenEntity, error)
	EditReviewDosen(ctx context.Context, reviewDosen entity.ReviewDosenEntity) error
	DeleteReviewDosen(ctx context.Context, dosenId, userId int64) error
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
		rating,
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

func (rd *reviewDosenRepository) GetReviewStatusByID(ctx context.Context, dosenId, userId int64) (string, error) {
	verifiedStatus := entity.CheckVerifiedUserEntity{}
	err := rd.db.Table("users").
		Select("email, COALESCE(is_verified, false) AS verify_status").
		Joins("LEFT JOIN verify ON users.verify_id = verify.nim").
		Where("users.id = ?", userId).
		Limit(1).
		Scan(&verifiedStatus).Error

	if err != nil {
		code = "[REPOSITORY] GetReviewStatusById - 1"
		log.Errorw(code, err)
		return "", err
	}

	if !verifiedStatus.VerifyStatus {
		return "NotVerified", nil
	}


	kpMatch := entity.CheckKpMatchEntity{}
	err = rd.db.Table("users").
		Select(`email, 
			CASE 
				WHEN dosen.nama IS NOT NULL THEN true 
				ELSE false 
			END AS kp_matches, 
			dosen.id AS dosen_id
		`).
		Joins("LEFT JOIN verify ON users.verify_id = verify.nim").
		Joins("LEFT JOIN dosen ON verify.kp_id = dosen.kp_id").
		Where("dosen.id = ? AND users.id = ?", dosenId, userId).
		Limit(1).
		Scan(&kpMatch).Error

	if err != nil {
		code = "[REPOSITORY] GetReviewStatusById - 2"
		log.Errorw(code, err)
		return "", err
	}

	if !kpMatch.KpMatches {
		return "DifferentKampusProdi", nil
	}


	alreadyReviewed := entity.CheckAlreadyReviewedEntity{}
	err = rd.db.Table("review_dosen").
		Select("COUNT(*)").
		Where("dosen_id = ? AND user_id = ?", dosenId, userId).
		Scan(&alreadyReviewed).Error

	if err != nil {
		code = "[REPOSITORY] GetReviewStatusById - 3"
		log.Errorw(code, err)
		return "", err
	}

	if alreadyReviewed.Count > 0 {
		return "HasReviewed", nil
	}

	return "Allow", nil
}

func (rd *reviewDosenRepository) GetReviewData(ctx context.Context, dosenId, userId int64) (*entity.ReviewDosenEntity, error) {
	reviewData := entity.ReviewDosenEntity{}
	err = rd.db.Table("review_dosen").
		Select("*").
		Where("dosen_id = ? AND user_id = ?", dosenId, userId).
		Scan(&reviewData).Error

	if err != nil {
		code = "[REPOSITORY] GetReviewData - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return &reviewData, nil
}

func (rd *reviewDosenRepository) EditReviewDosen(ctx context.Context, req entity.ReviewDosenEntity) error {
	err := rd.db.Table("review_dosen").
	Where("user_id = ? AND dosen_id = ?", req.UserID, req.DosenID).
	Update("matkul", req.Matkul).
	Update("content", req.Content).
	Update("rating", req.Rating).
	Error

	if err != nil {
		code = "[REPOSITORY] EditReviewDosen - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func (rd *reviewDosenRepository) DeleteReviewDosen(ctx context.Context, dosenId, userId int64) error {
	err = rd.db.Table("review_dosen").
		Where("dosen_id = ? AND user_id = ?", dosenId, userId).
		Delete(nil).Error

	if err != nil {
		code = "[REPOSITORY] DeleteReviewData - 1"
		log.Errorw(code, err)
		return  err
	}

	return nil
}

func NewReviewDosenRepository(db *gorm.DB) ReviewDosenRepository {
	return &reviewDosenRepository{db: db}
}
