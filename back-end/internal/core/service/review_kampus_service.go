package service

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/config"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/gofiber/fiber/v2/log"
)

type ReviewKampusService interface {
	CreateReviewKampus(ctx context.Context, req entity.ReviewKampusEntity) error
	GetReviewKampusByID(ctx context.Context, kampusId, userId int64) ([]entity.ReviewKampusItemEntity, error)
}

type reviewKampusService struct {
	reviewRepo repository.ReviewKampusRepository
}

func (rk *reviewKampusService) CreateReviewKampus(ctx context.Context, req entity.ReviewKampusEntity) error {
	err = rk.reviewRepo.CreateReviewKampus(ctx, req)
	if err != nil {
		code = "[SERVICE] CreateReviewKampus - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func (rk *reviewKampusService) GetReviewKampusByID(ctx context.Context, kampusId, userId int64) ([]entity.ReviewKampusItemEntity, error) {
	result, err := rk.reviewRepo.GetReviewKampusByID(ctx, kampusId, userId)
	if err != nil {
		code = "[SERVICE] GetReviewKampuById - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return result, nil
}

func NewReviewKampusService(reviewRepo repository.ReviewKampusRepository, cfg *config.Config) ReviewKampusService {
	return &reviewKampusService{
		reviewRepo: reviewRepo,
	}
}
