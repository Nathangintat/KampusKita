package service

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/gofiber/fiber/v2/log"
)

type VerifyService interface {
	Verify(ctx context.Context, req entity.VerifyEntity) error
}

type verifyService struct {
	verifyRepo repository.VerifyRepository
}

func (v *verifyService) Verify(ctx context.Context, req entity.VerifyEntity) error {
	err = v.verifyRepo.Verify(ctx, req)
	if err != nil {
		code = "[SERVICE] Verify - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func NewVerifyService(verifyRepo repository.VerifyRepository) VerifyService {
	return &verifyService{
		verifyRepo: verifyRepo,
	}
}
