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
	GetReviewStatusByID(ctx context.Context, dosenId, userId int64) (string, error)
	GetReviewData(ctx context.Context, dosenId, userId int64) (*entity.ReviewDosenEntity, error)
	EditReviewDosen(ctx context.Context, req entity.ReviewDosenEntity) error
	DeleteReviewDosen(ctx context.Context, dosenId, userId int64) error
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

func (rd *reviewDosenService) GetReviewStatusByID(ctx context.Context, dosenId, userId int64) (string, error) {
	outputStr, err := rd.reviewDosenRepo.GetReviewStatusByID(ctx, dosenId, userId)
	if err != nil {
		code = "[SERVICE] GetReviewStatusByID - 1"
		log.Errorw(code, err)
		return "", err
	}

	return outputStr, nil
}

func (rd *reviewDosenService) GetReviewData(ctx context.Context, dosenId, userId int64) (*entity.ReviewDosenEntity, error) {
	review, err := rd.reviewDosenRepo.GetReviewData(ctx, dosenId, userId)
	if err != nil {
		code = "[SERVICE] GetReviewData - 1"
		log.Errorw(code, err)
		return nil, err
	}
	return review, nil
}

func (rd *reviewDosenService) EditReviewDosen(ctx context.Context, req entity.ReviewDosenEntity) error {
	err = rd.reviewDosenRepo.EditReviewDosen(ctx, req)
	if err != nil {
		code = "[SERVICE] EditReviewDosen - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func (rd *reviewDosenService) DeleteReviewDosen(ctx context.Context, dosenId, userId int64) error {
	err = rd.reviewDosenRepo.DeleteReviewDosen(ctx, dosenId, userId)
	if err != nil {
		code = "[SERVICE] DeleteReviewDosen - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func NewReviewDosenService(reviewRepo repository.ReviewDosenRepository) ReviewDosenService {
	return &reviewDosenService{reviewDosenRepo: reviewRepo}
}
