package service

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/gofiber/fiber/v2/log"
)

type LikeDislikeKampusService interface {
	AddLikeKampus(ctx context.Context, reviewID, userID int64) error
	AddDislikeKampus(ctx context.Context, reviewID, userID int64) error
}

type likeDislikeKampusService struct {
	likeDislikeRepo repository.LikeDislikeKampusRepository
}

func (l *likeDislikeKampusService) AddLikeKampus(ctx context.Context, reviewID, userID int64) error {
	err := l.likeDislikeRepo.AddLikeKampus(ctx, reviewID, userID)
	if err != nil {
		code = "[SERVICE] AddLike review Kampus - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func (l *likeDislikeKampusService) AddDislikeKampus(ctx context.Context, reviewID, userID int64) error {
	err := l.likeDislikeRepo.AddDislikeKampus(ctx, reviewID, userID)
	if err != nil {
		code = "[SERVICE] AddDislike review kampus - 1"
		log.Errorw(code, err)
		return err
	}
	return nil
}

func NewLikeDislikeKampusService(likeDislikeRepo repository.LikeDislikeKampusRepository) LikeDislikeKampusService {
	return &likeDislikeKampusService{likeDislikeRepo: likeDislikeRepo}
}
