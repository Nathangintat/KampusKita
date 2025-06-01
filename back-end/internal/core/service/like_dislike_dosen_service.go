package service

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/gofiber/fiber/v2/log"
)

type LikeDislikeDosenService interface {
	AddLikeDosen(ctx context.Context, reviewID, userID int64) error
	AddDislikeDosen(ctx context.Context, reviewID, userID int64) error
}

type likeDislikeDosenService struct {
	likeDislikeRepo repository.LikeDislikeDosenRepository
}

func (l *likeDislikeDosenService) AddLikeDosen(ctx context.Context, reviewID, userID int64) error {
	err := l.likeDislikeRepo.AddLikeDosen(ctx, reviewID, userID)
	if err != nil {
		code = "[SERVICE] AddLike review Dosen - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func (l *likeDislikeDosenService) AddDislikeDosen(ctx context.Context, reviewID, userID int64) error {
	err := l.likeDislikeRepo.AddDislikeDosen(ctx, reviewID, userID)
	if err != nil {
		code = "[SERVICE] AddDislike review Dosen - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func NewLikeDislikeDosenService(likeDislikeRepo repository.LikeDislikeDosenRepository) LikeDislikeDosenService {
	return &likeDislikeDosenService{likeDislikeRepo: likeDislikeRepo}
}
