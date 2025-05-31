package service

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/gofiber/fiber/v2/log"
)

type ReviewDosenService interface {
	CreateReviewDosen(ctx context.Context, req entity.ReviewDosenEntity) error
	GetReviewDosenByID(ctx context.Context, dosenId, userId int64) (*entity.ReviewDosenItemEntity, []entity.RatingDosenEntity, error)
}

type reviewDosenService struct {
	reviewDosenRepo repository.ReviewDosenRepository
}

func (rd *reviewDosenService) CreateReviewDosen(ctx context.Context, req entity.ReviewDosenEntity) error {
	err = rd.reviewDosenRepo.CreateReviewDosen(ctx, req)
	if err != nil {
		code = "[SERVICE] CreateReviewDosen - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func (rd *reviewDosenService) GetReviewDosenByID(ctx context.Context, dosenId, userId int64) (*entity.ReviewDosenItemEntity, []entity.RatingDosenEntity, error) {
	results, ratingResult, err := rd.reviewDosenRepo.GetReviewDosenByID(ctx, dosenId, userId)
	if err != nil {
		code = "[SERVICE] GetReviewDosenByID - 1"
		log.Errorw(code, err)
		return nil, nil, err
	}
	return results, ratingResult, nil
}

func NewReviewDosenService(reviewRepo repository.ReviewDosenRepository) ReviewDosenService {
	return &reviewDosenService{reviewDosenRepo: reviewRepo}
}
