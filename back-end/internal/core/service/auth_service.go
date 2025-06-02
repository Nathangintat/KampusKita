package service

import (
	"context"
	"fmt"
	"time"

	"github.com/ThePlatypus-Person/KampusKita/config"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/lib/auth"
	"google.golang.org/api/idtoken"

	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
)

var err error
var code string

type AuthService interface {
	GetUserByEmail(ctx context.Context, req entity.LoginGmail) (*entity.AccessToken, error)
	LoginWithGoogle(ctx context.Context, req entity.LoginRequest) (entity.LoginGmail, error)
}

type authService struct {
	authRepository repository.AuthRepository
	cfg            *config.Config
	jwtToken       auth.Jwt
}

func (a *authService) LoginWithGoogle(ctx context.Context, req entity.LoginRequest) (entity.LoginGmail, error) {
	payload, err := idtoken.ParsePayload(req.GoogleIdToken)

	if err != nil {
		return entity.LoginGmail{}, fmt.Errorf("invalid token: %w", err)
	}

	gmail := entity.LoginGmail{
		Email: payload.Claims["email"].(string),
	}

	return gmail, err
}

// GetUserByEmail implements AuthService.
func (a *authService) GetUserByEmail(ctx context.Context, req entity.LoginGmail) (*entity.AccessToken, error) {
	result, err := a.authRepository.GetUserByEmail(ctx, req)
	if err != nil {
		newuser := entity.UserEntity{
			Email: req.Email,
		}
		err = a.authRepository.CreateNewUser(ctx, newuser)
		if err != nil {
			code = "[SERVICE] GetUserByEmail - 1"
			log.Errorw(code, err)
			return nil, err
		}

		result, err = a.authRepository.GetUserByEmail(ctx, req)
		if err != nil {
			code = "[SERVICE] GetUserByEmail - 2"
			log.Errorw(code, err)
			return nil, err
		}
	}

	jwtData := entity.JwtData{
		UserID: float64(result.ID),
		RegisteredClaims: jwt.RegisteredClaims{
			NotBefore: jwt.NewNumericDate(time.Now()),
			ID:        string(result.ID),
		},
	}

	accessToken, expiresAt, err := a.jwtToken.GenerateToken(&jwtData)
	if err != nil {
		code = "[SERVICE] GetUserByEmail - 3"
		log.Errorw(code, err)
		return nil, err
	}

	resp := entity.AccessToken{
		AccessToken: accessToken,
		ExpiresAt:   expiresAt,
		Username: result.Username,
	}

	return &resp, nil
}

func NewAuthService(authRepository repository.AuthRepository, cfg *config.Config, jwtToken auth.Jwt) AuthService {
	return &authService{
		authRepository: authRepository,
		cfg:            cfg,
		jwtToken:       jwtToken,
	}
}
