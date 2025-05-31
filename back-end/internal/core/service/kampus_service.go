package service

import (
	"github.com/gofiber/fiber/v2/log"
)

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/config"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
)

type KampusService interface {
	GetKampus(ctx context.Context) ([]entity.KampusEntity, error)
	GetKampusByID(ctx context.Context, id int64) (*entity.KampusEntity, *entity.RatingKampusEntity, error)
	SearchKampus(ctx context.Context, keyword string) ([]entity.KampusEntity, *entity.RatingKampusEntity, error)
	GetDosenByKampusID(ctx context.Context, id int64) ([]entity.DosenItemEntity, error)
	GetTopFasilitasKampus(ctx context.Context) ([]entity.RankingKampusEntity, error)
}

type kampusService struct {
	kampusRepo repository.KampusRepository
	reviewRepo repository.ReviewKampusRepository
	cfg        *config.Config
}

func (k *kampusService) SearchKampus(ctx context.Context, keyword string) ([]entity.KampusEntity, *entity.RatingKampusEntity, error) {
	results, err := k.kampusRepo.SearchKampus(ctx, keyword)
	if err != nil {
		code = "[SERVICE] SearchKampus - 1"
		log.Errorw(code, err)
		return nil, nil, err
	}

	ratingResult, err := k.reviewRepo.GetRatingKampusByID(ctx, results[0].ID)
	if err != nil {
		code = "[SERVICE] SearchKampus - 2"
		log.Errorw(code, err)
		return nil, nil, err
	}

	return results, ratingResult, nil
}

func (k *kampusService) GetKampusByID(ctx context.Context, id int64) (*entity.KampusEntity, *entity.RatingKampusEntity, error) {
	result, err := k.kampusRepo.GetKampusByID(ctx, id)
	if err != nil {
		code = "[SERVICE] GetKampusByID - 1"
		log.Errorw(code, err)
		return nil, nil, err
	}

	ratingResult, err := k.reviewRepo.GetRatingKampusByID(ctx, id)
	if err != nil {
		code = "[SERVICE] GetKampusByID - 2"
		log.Errorw(code, err)
		return nil, nil, err
	}

	return result, ratingResult, nil
}

func (k *kampusService) GetKampus(ctx context.Context) ([]entity.KampusEntity, error) {
	results, err := k.kampusRepo.GetKampus(ctx)
	if err != nil {
		code = "[SERVICE] GetKampus - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return results, nil
}

func (k *kampusService) GetDosenByKampusID(ctx context.Context, id int64) ([]entity.DosenItemEntity, error) {
	results, err := k.kampusRepo.GetDosenByKampusID(ctx, id)
	if err != nil {
		code = "[SERVICE] GetDosenByKampusID - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return results, nil
}

func (k *kampusService) GetTopFasilitasKampus(ctx context.Context) ([]entity.RankingKampusEntity, error) {
	results, err := k.kampusRepo.GetTopFasilitasKampus(ctx)
	if err != nil {
		code = "[SERVICE] GetTopFasilitasKampus - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return results, nil
}

func NewKampusService(kampusRepository repository.KampusRepository, reviewRepository repository.ReviewKampusRepository, cfg *config.Config) KampusService {
	return &kampusService{
		kampusRepo: kampusRepository,
		reviewRepo: reviewRepository,
		cfg:        cfg,
	}
}
