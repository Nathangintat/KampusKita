package handler

import (
	"fmt"
	"strconv"

//	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/request"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
//	validatorLib "github.com/ThePlatypus-Person/KampusKita/lib/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type VerifyHandler interface {
	Verify(c *fiber.Ctx) error
	GetVerifyStatus(c *fiber.Ctx) error
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

	nim := c.FormValue("nim")
	kampusId, err := strconv.ParseInt(c.FormValue("kampusId"), 10, 64)
	prodiId, err := strconv.ParseInt(c.FormValue("prodiId"), 10, 64)
	file, err := c.FormFile("image")

	if err != nil {
		code := "[HANDLER] Verify - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Invalid FormData"

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	imageName := fmt.Sprintf("./public/images/%s", file.Filename)
	err = c.SaveFile(file, imageName)

	if err != nil {
		code := "[HANDLER] Verify - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Failed to save image"

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	reqEntity := entity.VerifyEntity{
		UserID: 	int64(claims.UserID),
		Nim:        string(nim),
		Kampus:     int64(kampusId),
		Prodi:      int64(prodiId),
		IsVerified: false,
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
	defaultSuccessResponse.Meta.Message = "Success"
	defaultSuccessResponse.Data = nil

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func (v *verifyHandler) GetVerifyStatus(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] GetVerifyStatus - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	status, err := v.verifyService.GetVerifyStatus(c.Context(), int64(claims.UserID))

	if err != nil {
		code := "[HANDLER] GetVerifyStatus - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Verify success"
	defaultSuccessResponse.Data = status

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func NewVerifyHandler(verifyService service.VerifyService) VerifyHandler {
	return &verifyHandler{
		verifyService: verifyService,
	}
}
