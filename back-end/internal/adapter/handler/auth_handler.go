package handler

import (
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/request"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/response"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	validatorLib "github.com/ThePlatypus-Person/KampusKita/lib/validator"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

var err error
var code string
var errorResp response.ErrorResponseDefault
var validate = validator.New()

type AuthHandler interface {
	Login(c *fiber.Ctx) error
}

type authHandler struct {
	authService service.AuthService
}

func (a *authHandler) Login(c *fiber.Ctx) error {
	req := request.LoginRequest{}
	resp := response.SuccessAuthResponse{}

	if err = c.BodyParser(&req); err != nil {
		code = "[HANDLER] Login - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	if err = validatorLib.ValidateStruct(req); err != nil {
		code = "[HANDLER] Login - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	reqLogin := entity.LoginRequest{
		GoogleIdToken: req.GoogleIdToken,
	}

	payload, err := a.authService.LoginWithGoogle(c.Context(), reqLogin)
	result, err := a.authService.GetUserByEmail(c.Context(), payload)
	if err != nil {
		code = "[HANDLER] Login - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		if err.Error() == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
		}
		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	resp.Meta.Status = true
	resp.Meta.Message = "Login successful"
	resp.AccessToken = result.AccessToken
	resp.ExpiresAt = result.ExpiresAt
	resp.Username = result.Username

	return c.JSON(resp)
}

func NewAuthHandler(authService service.AuthService) AuthHandler {
	return &authHandler{
		authService: authService,
	}
}
