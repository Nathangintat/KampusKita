package service

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/gofiber/fiber/v2/log"
)

type DosenService interface {
	GetDosenByID(ctx context.Context, id int64) (*entity.DosenEntity, error)
	SearchDosen(ctx context.Context, q string) ([]entity.SearchDosenEntity, error)
	GetTopDosen(ctx context.Context) ([]entity.RankingDosenEntity, error)
}

type dosenService struct {
	dosenRepo repository.DosenRepository
}

func (d *dosenService) GetDosenByID(ctx context.Context, id int64) (*entity.DosenEntity, error) {
	result, err := d.dosenRepo.GetDosenByID(ctx, id)
	if err != nil {
		code = "[SERVICE] GetDosenByID - 1"
		log.Errorw(code, err)
		return nil, err
	}
	return result, nil
}

func (d *dosenService) SearchDosen(ctx context.Context, q string) ([]entity.SearchDosenEntity, error) {
	results, err := d.dosenRepo.SearchDosen(ctx, q)
	if err != nil {
		code = "[SERVICE] SearchDosen - 1"
		log.Errorw(code, err)
		return nil, err
	}
	return results, nil
}

func (d *dosenService) GetTopDosen(ctx context.Context) ([]entity.RankingDosenEntity, error) {
	results, err := d.dosenRepo.GetTopDosen(ctx)
	if err != nil {
		code = "[SERVICE] GetTopDosen - 1"
		log.Errorw(code, err)
		return nil, err
	}
	return results, nil
}

func NewDosenService(dosenRepository repository.DosenRepository) DosenService {
	return &dosenService{dosenRepo: dosenRepository}
}
