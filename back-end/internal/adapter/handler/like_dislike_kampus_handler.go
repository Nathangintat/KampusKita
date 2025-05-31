package handler

import (
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/ThePlatypus-Person/KampusKita/lib/conv"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type LikeDislikeKampusHandler interface {
	AddLikeKampus(c *fiber.Ctx) error
	AddDislikeKampus(c *fiber.Ctx) error
}

type likeDislikeKampusHandler struct {
	likeDislikeKampusService service.LikeDislikeKampusService
}

func (l *likeDislikeKampusHandler) AddLikeKampus(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] AddLikeKampus - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	idParam := c.Params("reviewId")
	reviewId, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] AddLikeKampus - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	err = l.likeDislikeKampusService.AddLikeKampus(c.Context(), reviewId, int64(claims.UserID))
	if err != nil {
		code := "[HANDLER] AddLikeKampus - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Like Added successfully"
	defaultSuccessResponse.Data = nil

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func (l *likeDislikeKampusHandler) AddDislikeKampus(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] AddDislikeKampus - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	idParam := c.Params("reviewId")
	reviewId, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] AddDislikeKampus - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	err = l.likeDislikeKampusService.AddDislikeKampus(c.Context(), reviewId, int64(claims.UserID))
	if err != nil {
		code := "[HANDLER] AddDislikeKampus - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Dislike Added successfully"
	defaultSuccessResponse.Data = nil

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func NewLikeDislikeKampusHandler(likeDislikeKampusService service.LikeDislikeKampusService) LikeDislikeKampusHandler {
	return &likeDislikeKampusHandler{
		likeDislikeKampusService: likeDislikeKampusService,
	}
}
