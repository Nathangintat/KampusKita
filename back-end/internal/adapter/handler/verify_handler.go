package handler

import (
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/request"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	validatorLib "github.com/ThePlatypus-Person/KampusKita/lib/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type VerifyHandler interface {
	Verify(c *fiber.Ctx) error
}

type verifyHandler struct {
	verifyService service.VerifyService
}

func (v *verifyHandler) Verify(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] Verify - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	var req request.VerifyRequest
	if err = c.BodyParser(&req); err != nil {
		code := "[HANDLER] Verify - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Invalid request body"

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	if err = validatorLib.ValidateStruct(&req); err != nil {
		code := "[HANDLER] Verify - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	reqEntity := entity.VerifyEntity{
		Nim:        req.Nim,
		Kampus:     req.Kampus,
		Prodi:      req.Prodi,
		IsVerified: req.IsVerified,
	}

	err = v.verifyService.Verify(c.Context(), reqEntity)
	if err != nil {
		code := "[HANDLER] Verify - 4"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Verify success"
	defaultSuccessResponse.Data = nil

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func NewVerifyHandler(verifyService service.VerifyService) VerifyHandler {
	return &verifyHandler{
		verifyService: verifyService,
	}
}
