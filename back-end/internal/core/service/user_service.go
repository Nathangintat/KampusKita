package service

import (
	"context"
	"time"

	"github.com/ThePlatypus-Person/KampusKita/config"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/lib/auth"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
)

type UserService interface {
	DeleteUserByID(ctx context.Context, id int64) error
	ChangeUsername(ctx context.Context, id int64, username string) (*entity.AccessToken, error)
}

type userService struct {
	userRepo repository.UserRepository
	cfg      *config.Config
	jwtToken auth.Jwt
}

func (u *userService) DeleteUserByID(ctx context.Context, id int64) error {
	err := u.userRepo.DeleteUserByID(ctx, id)
	if err != nil {
		code = "[SERVICE] GetKampus - 1"
		log.Errorw(code, err)
		return err
	}

	return nil
}

func (u *userService) ChangeUsername(ctx context.Context, id int64, username string) (*entity.AccessToken, error) {
	id, err := u.userRepo.ChangeUsername(ctx, id, username)
	if err != nil {
		code = "[SERVICE] ChangeUsername - 1"
		log.Errorw(code, err)
		return nil, err
	}

	jwtData := entity.JwtData{
		UserID: float64(id),
		RegisteredClaims: jwt.RegisteredClaims{
			NotBefore: jwt.NewNumericDate(time.Now()),
			ID:        string(id),
		},
	}

	accessToken, expiresAt, err := u.jwtToken.GenerateToken(&jwtData)
	if err != nil {
		code = "[SERVICE] ChangeUsername - 2"
		log.Errorw(code, err)
		return nil, err
	}

	resp := entity.AccessToken{
		AccessToken: accessToken,
		ExpiresAt:   expiresAt,
	}

	return &resp, nil
}

func NewUserService(userRepo repository.UserRepository, cfg *config.Config, jwtToken auth.Jwt) UserService {
	return &userService{
		userRepo: userRepo,
		cfg:      cfg,
		jwtToken: jwtToken,
	}
}
