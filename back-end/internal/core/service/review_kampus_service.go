package service

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/config"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/request"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/gofiber/fiber/v2/log"
)

type ReviewKampusService interface {
	CreateReviewKampus(ctx context.Context, req entity.ReviewKampusEntity) error
	GetReviewKampusByID(ctx context.Context, kampusId, userId int64) ([]entity.ReviewKampusItemEntity, error)
	GetReviewStatusByID(ctx context.Context, dosenId, userId int64) (string, error)
	GetReviewData(ctx context.Context, kampusId, userId int64) (*entity.ReviewKampusEntity, error)
	EditReview(ctx context.Context, req request.ReviewKampusRequest, userId int64) error
	DeleteReview(ctx context.Context, kampusId, userId int64) error
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

func (kh *reviewKampusService) GetReviewStatusByID(ctx context.Context, kampusId, userId int64) (string, error) {
	outputStr, err := kh.reviewRepo.GetReviewStatusByID(ctx, kampusId, userId)
	if err != nil {
		code = "[SERVICE] GetReviewStatusByID - 1"
		log.Errorw(code, err)
		return "", err
	}

	return outputStr, nil
}

func (kh *reviewKampusService) GetReviewData(ctx context.Context, kampusId, userId int64) (*entity.ReviewKampusEntity, error) {
	review, err := kh.reviewRepo.GetReviewData(ctx, kampusId, userId)
	if err != nil {
		code = "[SERVICE] GetReviewData - 1"
		log.Errorw(code, err)
		return nil, err
	}
	return review, nil
}

func (kh *reviewKampusService) EditReview(ctx context.Context, req request.ReviewKampusRequest, userId int64) error {
	err = kh.reviewRepo.EditReview(ctx, req, userId)
	if err != nil {
		code = "[SERVICE] EditReview - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func (kh *reviewKampusService) DeleteReview(ctx context.Context, kampusId, userId int64) error {
	err = kh.reviewRepo.DeleteReview(ctx, kampusId, userId)
	if err != nil {
		code = "[SERVICE] DeleteReview - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func NewReviewKampusService(reviewRepo repository.ReviewKampusRepository, cfg *config.Config) ReviewKampusService {
	return &reviewKampusService{
		reviewRepo: reviewRepo,
	}
}
