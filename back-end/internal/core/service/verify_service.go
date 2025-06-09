package service

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
)

type VerifyService interface {
	Verify(ctx context.Context, req entity.VerifyEntity) error
	GetVerifyStatus(ctx context.Context, userId int64) (*model.VerifyStatus, error)
	GetAllVerifyRequest(ctx context.Context) ([]entity.GetVerifyEntity, error)
	ApproveVerifyRequest(ctx context.Context, nim string) error
	RejectVerifyRequest(ctx context.Context, nim string) error
}

type verifyService struct {
	verifyRepo repository.VerifyRepository
	kpMapRepo repository.KpMapRepository
	userRepo repository.UserRepository
}

func (v *verifyService) Verify(ctx context.Context, req entity.VerifyEntity) error {
	kpItem, err := v.kpMapRepo.GetKpID(ctx, req.Kampus, req.Prodi)

	if err != nil {
		code = "[SERVICE] Verify - 1"
		log.Errorw(code, err)
		return err
	}

	err = v.verifyRepo.Verify(ctx, req.Nim, kpItem.ID, req.ImgType)

	if err != nil {
		code = "[SERVICE] Verify - 2"
		log.Errorw(code, err)
		return err
	}

	_, err = v.userRepo.ChangeNim(ctx, req.UserID, req.Nim)

	if err != nil {
		code = "[SERVICE] Verify - 3"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func (v *verifyService) GetVerifyStatus(ctx context.Context, userId int64) (*model.VerifyStatus, error) {
	verifyStatus, err := v.userRepo.GetVerifyStatus(ctx, userId)

	if err != nil {
		code = "[SERVICE] GetVerifyStatus - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return verifyStatus, nil
}

func (v *verifyService) GetAllVerifyRequest(ctx context.Context) ([]entity.GetVerifyEntity, error) {
	data, err := v.verifyRepo.GetAllVerifyRequest(ctx)

	if err != nil {
		code = "[SERVICE] GetAllVerifyRequest - 1"
		log.Errorw(code, err)
		return nil, err
	}

	return data, nil
}

func (v *verifyService) ApproveVerifyRequest(ctx context.Context, nim string) error {
	err := v.verifyRepo.ApproveVerifyRequest(ctx, nim)

	if err != nil {
		code = "[SERVICE] ApproveVerifyRequest - 1"
		log.Errorw(code, err)
		return  err
	}

	return nil
}

func (v *verifyService) RejectVerifyRequest(ctx context.Context, nim string) error {
	err := v.verifyRepo.RejectVerifyRequest(ctx, nim)

	if err != nil {
		code = "[SERVICE] RejectVerifyRequest - 1"
		log.Errorw(code, err)
		return  err
	}

	return nil
}

func NewVerifyService(verifyRepo repository.VerifyRepository, kpMapRepo repository.KpMapRepository, userRepo repository.UserRepository) VerifyService {
	return &verifyService{
		verifyRepo: verifyRepo,
		kpMapRepo: kpMapRepo,
		userRepo: userRepo,
	}
}
