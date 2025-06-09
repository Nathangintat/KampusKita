package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/request"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type ReviewKampusRepository interface {
	GetRatingKampusByID(ctx context.Context, id int64) (*entity.RatingKampusEntity, error)
	CreateReviewKampus(ctx context.Context, req entity.ReviewKampusEntity) error
	GetReviewKampusByID(ctx context.Context, kampusID, userID int64) ([]entity.ReviewKampusItemEntity, error)
	GetReviewStatusByID(ctx context.Context, kampusId, userId int64) (string, error)
	GetReviewData(ctx context.Context, kampusId, userId int64) (*entity.ReviewKampusEntity, error)
	EditReview(ctx context.Context, req request.ReviewKampusRequest, userId int64) error
	DeleteReview(ctx context.Context, kampusId, userId int64) error
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

func (kh *reviewKampusRepository) GetReviewStatusByID(ctx context.Context, kampusId, userId int64) (string, error) {
	verifiedStatus := entity.CheckVerifiedUserEntity{}
	err := kh.db.Table("users").
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


	kampusMatch := entity.CheckKampusMatchEntity{}
	err = kh.db.Table("users").
		Select(`email, 
			CASE 
				WHEN kampus.nama IS NOT NULL THEN true 
				ELSE false 
			END AS matches, 
			kampus.id AS kampus_id
		`).
		Joins("LEFT JOIN verify ON users.verify_id = verify.nim").
		Joins("LEFT JOIN kp_map ON verify.kp_id = kp_map.id").
		Joins("LEFT JOIN kampus ON kp_map.kampus_id = kampus.id").
		Where("kampus.id = ? AND users.id = ?", kampusId, userId).
		Limit(1).
		Scan(&kampusMatch).Error

	if err != nil {
		code = "[REPOSITORY] GetReviewStatusById - 2"
		log.Errorw(code, err)
		return "", err
	}

	if !kampusMatch.Matches {
		return "DifferentKampus", nil
	}


	alreadyReviewed := entity.CheckAlreadyReviewedEntity{}
	err = kh.db.Table("review_kampus").
		Select("COUNT(*)").
		Joins("JOIN kp_map ON review_kampus.kp_id = kp_map.id").
		Where("kp_map.kampus_id = ? AND user_id = ?", kampusId, userId).
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

func (kh *reviewKampusRepository) GetReviewData(ctx context.Context, kampusId, userId int64) (*entity.ReviewKampusEntity, error) {
	reviewData := entity.ReviewKampusEntity{}
	err = kh.db.Table("review_kampus").
		Select(`
			review_kampus.id, review_kampus.user_id, review_kampus.kp_id,
			review_kampus.content, review_kampus.rating_fasilitas, review_kampus.rating_internet,
			review_kampus.rating_lokasi, review_kampus.rating_ormawa, 
			review_kampus.rating_worth_it, review_kampus.created_at
		`).
		Joins("JOIN kp_map ON kp_map.id = review_kampus.kp_id").
		Where("kp_map.kampus_id = ? AND review_kampus.user_id = ?", kampusId, userId).
		Limit(1).
		Scan(&reviewData).Error

	if err != nil {
		code = "[REPOSITORY] GetReviewData - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return &reviewData, nil
}

func (kh *reviewKampusRepository) EditReview(ctx context.Context, req request.ReviewKampusRequest, userId int64) error {
	query := `
	UPDATE review_kampus
	SET content = ?, 
	rating_fasilitas = ?, 
	rating_internet = ?, 
	rating_lokasi = ?, 
	rating_ormawa = ?, 
	rating_worth_it = ?
	FROM kp_map
	WHERE kp_map.id = review_kampus.kp_id
	AND kp_map.kampus_id = ?
	AND review_kampus.user_id = ?
	`


	err := kh.db.Exec(query,
		req.Content,
		req.Fasilitas,
		req.Wifi,
		req.Lokasi,
		req.Organisasi,
		req.WorthIt,
		req.KampusId,
		userId,
	).Error

	if err != nil {
		code = "[REPOSITORY] EditReview - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func (kh *reviewKampusRepository) DeleteReview(ctx context.Context, kampusId, userId int64) error {
	query := `
	DELETE FROM review_kampus
	USING kp_map
	WHERE kp_map.id = review_kampus.kp_id
	AND kp_map.kampus_id = ?
	AND review_kampus.user_id = ?
	`

	err := kh.db.Exec(query, kampusId, userId).Error

	if err != nil {
		code = "[REPOSITORY] DeleteReview - 1"
		log.Errorw(code, err)
		return  err
	}

	return nil
}



func NewReviewKampusRepository(db *gorm.DB) ReviewKampusRepository {
	return &reviewKampusRepository{db: db}
}
