package handler

import (
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/request"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/response"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type UserHandler interface {
	DeleteUser(c *fiber.Ctx) error
	ChangeUsername(c *fiber.Ctx) error
}

type usertHandler struct {
	userService service.UserService
}

func (u *usertHandler) DeleteUser(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] DeleteUser - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}
	userID := claims.UserID

	err = u.userService.DeleteUserByID(c.Context(), int64(userID))
	if err != nil {
		code := "[HANDLER] DeleteUser - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func (u *usertHandler) ChangeUsername(c *fiber.Ctx) error {
	resp := response.SuccessAuthResponse{}

	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] ChangeUsername - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}
	userID := claims.UserID

	var req request.ChangeUsernameRequest
	if err = c.BodyParser(&req); err != nil {
		code := "[HANDLER] ChangeUsername - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Invalid request body"

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	token, err := u.userService.ChangeUsername(c.Context(), int64(userID), req.NewUsername)
	if err != nil {
		code := "[HANDLER] ChangeUsername - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	resp.Meta.Status = true
	resp.Meta.Message = "Change Username success"
	resp.AccessToken = token.AccessToken
	resp.Username = req.NewUsername
	resp.ExpiresAt = token.ExpiresAt

	return c.JSON(resp)
}

func NewUserHandler(userService service.UserService) UserHandler {
	return &usertHandler{
		userService: userService,
	}
}
