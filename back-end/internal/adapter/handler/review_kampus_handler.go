package handler

import (
	"time"

	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/request"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/response"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/ThePlatypus-Person/KampusKita/lib/conv"
	validatorLib "github.com/ThePlatypus-Person/KampusKita/lib/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type ReviewKampusHandler interface {
	CreateReviewKampus(c *fiber.Ctx) error
	GetReviewKampusById(c *fiber.Ctx) error
}

type reviewKampustHandler struct {
	reviewService service.ReviewKampusService
}

func (kh *reviewKampustHandler) CreateReviewKampus(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] CreateReviewKampus - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	userID := claims.UserID
	var req request.ReviewKampusRequest
	if err = c.BodyParser(&req); err != nil {
		code := "[HANDLER] CreateReviewKampus - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Invalid request body"

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	if err = validatorLib.ValidateStruct(&req); err != nil {
		code := "[HANDLER] CreateReviewKampus - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	reqEntity := entity.ReviewKampusEntity{
		UserID:          int64(userID),
		KPMapID:         req.KpID,
		Content:         req.Content,
		RatingFasilitas: req.Fasilitas,
		RatingInternet:  req.Wifi,
		RatingLokasi:    req.Lokasi,
		RatingOrmawa:    req.Organisasi,
		RatingWorthIt:   req.WorthIt,
		CreatedAt:       time.Now(),
	}

	err = kh.reviewService.CreateReviewKampus(c.Context(), reqEntity)
	if err != nil {
		code := "[HANDLER] CreateReviewKampus - 4"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Content created successfully"
	defaultSuccessResponse.Data = nil

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func (kh *reviewKampustHandler) GetReviewKampusById(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] GetReviewKampusByID - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}
	userID := claims.UserID
	idParam := c.Params("kampusID")
	kampusID, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] GetReviewKampusByID - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	results, err := kh.reviewService.GetReviewKampusByID(c.Context(), kampusID, int64(userID))
	if err != nil {
		code := "[HANDLER] GetReviewKampusByID - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respAllReview := []response.ReviewKampusItemResponse{}
	for _, review := range results {
		respReview := response.ReviewKampusItemResponse{
			ReviewID:    review.ReviewID,
			Date:        review.Date,
			Content:     review.Content,
			Like:        review.Like,
			Dislike:     review.Dislike,
			HasLiked:    review.HasLiked,
			HasDisliked: review.HasDisliked,
			Rating: &response.RatingReviewKampusResponse{
				Fasilitas:  float64(review.RatingFasilitas),
				Wifi:       float64(review.RatingInternet),
				Lokasi:     float64(review.RatingLokasi),
				Organisasi: float64(review.RatingOrmawa),
				WorthIt:    float64(review.RatingWorthIt),
			},
		}

		respAllReview = append(respAllReview, respReview)
	}

	defaultSuccessResponse.Data = respAllReview
	return c.JSON(defaultSuccessResponse)
}

func NewReviewKampusHandler(reviewService service.ReviewKampusService) ReviewKampusHandler {
	return &reviewKampustHandler{
		reviewService: reviewService,
	}
}
