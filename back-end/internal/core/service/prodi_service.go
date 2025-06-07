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

type ProdiService interface {
	GetProdiByKampusID(ctx context.Context, id int64) ([]entity.ProdiEntity, error)
}

type prodiService struct {
	kampusRepo repository.KampusRepository
	cfg        *config.Config
}

func (k *prodiService) GetProdiByKampusID(ctx context.Context, id int64) ([]entity.ProdiEntity, error) {
	results, err := k.kampusRepo.GetProdiByKampusID(ctx, id)
	if err != nil {
		code = "[SERVICE] GetProdiByKampusID - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return results, nil
}

func NewProdiService(kampusRepository repository.KampusRepository, cfg *config.Config) ProdiService {
	return &prodiService{
		kampusRepo: kampusRepository,
		cfg:        cfg,
	}
}
