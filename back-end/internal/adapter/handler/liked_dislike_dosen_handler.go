package handler

import (
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/ThePlatypus-Person/KampusKita/lib/conv"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type LikeDislikeDosenHandler interface {
	AddLikeDosen(c *fiber.Ctx) error
	AddDislikeDosen(c *fiber.Ctx) error
}

type likeDislikeDosenHandler struct {
	likeDislikeDosenService service.LikeDislikeDosenService
}

func (l *likeDislikeDosenHandler) AddLikeDosen(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] AddLikeDosen - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	idParam := c.Params("reviewDosenId")
	reviewId, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] AddLikeDosen - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	err = l.likeDislikeDosenService.AddLikeDosen(c.Context(), reviewId, int64(claims.UserID))
	if err != nil {
		code := "[HANDLER] AddLikeDosen - 3"
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

func (l *likeDislikeDosenHandler) AddDislikeDosen(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] AddDislikeDosen - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	idParam := c.Params("reviewDosenId")
	reviewId, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] AddDislikeDosen - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	err = l.likeDislikeDosenService.AddDislikeDosen(c.Context(), reviewId, int64(claims.UserID))
	if err != nil {
		code := "[HANDLER] AddDislikeDosen - 3"
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

func NewLikeDislikeDosenHandler(likeDislikeDosenService service.LikeDislikeDosenService) LikeDislikeDosenHandler {
	return &likeDislikeDosenHandler{
		likeDislikeDosenService: likeDislikeDosenService,
	}
}
