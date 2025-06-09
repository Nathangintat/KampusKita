package handler

import (
	"fmt"
	"strconv"
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

type ReviewDosenHandler interface {
	CreateReviewDosen(c *fiber.Ctx) error
	GetReviewDosenById(c *fiber.Ctx) error
	GetReviewStatusById(c *fiber.Ctx) error
	GetReviewData(c *fiber.Ctx) error
	EditReviewDosen(c *fiber.Ctx) error
	DeleteReviewDosen(c *fiber.Ctx) error
}

type reviewDosenHandler struct {
	reviewDosenService service.ReviewDosenService
}

func (rd *reviewDosenHandler) CreateReviewDosen(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] CreateReviewDosen - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	userID := claims.UserID
	var req request.ReviewDosenRequest
	if err = c.BodyParser(&req); err != nil {
		code := "[HANDLER] CreateReviewDosen - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Invalid request body"

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	if err = validatorLib.ValidateStruct(&req); err != nil {
		code := "[HANDLER] CreateReviewDosen - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	dosenId, err := strconv.ParseUint(req.DosenID, 10, 32)
	if err != nil {
		code := "[HANDLER] CreateReviewDosen - 3.5"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	reqEntity := entity.ReviewDosenEntity{
		UserID:    uint(userID),
		DosenID:   uint(dosenId),
		Matkul:    req.Matkul,
		Content:   req.Content,
		Rating:    req.Rating,
		CreatedAt: time.Now(),
	}
	fmt.Printf("dosenId = %d\n", reqEntity.DosenID)

	err = rd.reviewDosenService.CreateReviewDosen(c.Context(), reqEntity)
	if err != nil {
		code := "[HANDLER] CreateReviewDosen - 4"
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

func (rd *reviewDosenHandler) GetReviewDosenById(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] GetReviewDosenByID - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}
	userID := claims.UserID
	idParam := c.Params("dosenId")
	kampusID, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] GetReviewDosenById - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	results, ratingResult, err := rd.reviewDosenService.GetReviewDosenByID(c.Context(), kampusID, int64(userID))
	if err != nil {
		code := "[HANDLER] GetReviewDosenByID - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	var reviews []response.ReviewDosenResponse
	for _, r := range ratingResult {
		reviews = append(reviews, response.ReviewDosenResponse{
			ReviewID:    r.ReviewID,
			Date:        r.Date,
			Content:     r.Content,
			Matkul:      r.Matkul,
			Rating: 	 r.Rating,
			Like:        r.LikeCount,
			Dislike:     r.DislikeCount,
			HasLiked:    r.HasLiked,
			HasDisliked: r.HasDisliked,
		})
	}
	fmt.Print(reviews)

	resp := response.RatingDosenResponse{
		KampusID: results.KampusID,
		Nama:     results.Nama,
		Rating:   reviews,
	}

	defaultSuccessResponse.Data = resp
	return c.JSON(defaultSuccessResponse)
}

func (rd *reviewDosenHandler) GetReviewStatusById(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] GetReviewStatusById - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}
	userID := claims.UserID

	idParam := c.Params("dosenId")
	dosenID, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] GetReviewStatusById - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	message, err := rd.reviewDosenService.GetReviewStatusByID(c.Context(), dosenID, int64(userID))
	if err != nil {
		code := "[HANDLER] GetReviewStatusById - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"
	defaultSuccessResponse.Data = message
	return c.JSON(defaultSuccessResponse)
}

func (rd *reviewDosenHandler) GetReviewData(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] GetReviewData - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}
	userID := claims.UserID
	idParam := c.Params("dosenId")
	dosenID, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] GetReviewData - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}


	reviewData := &entity.ReviewDosenEntity{}
	reviewData, err = rd.reviewDosenService.GetReviewData(c.Context(), dosenID, int64(userID))
	if err != nil {
		code := "[HANDLER] GetReviewData - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	defaultSuccessResponse.Data = reviewData
	return c.JSON(defaultSuccessResponse)
}

func (rd *reviewDosenHandler) EditReviewDosen(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] EditReviewDosen - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	userID := claims.UserID
	var req request.ReviewDosenRequest
	if err = c.BodyParser(&req); err != nil {
		code := "[HANDLER] EditReviewDosen - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Invalid request body"

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	if err = validatorLib.ValidateStruct(&req); err != nil {
		code := "[HANDLER] EditReviewDosen - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	dosenId, err := strconv.ParseUint(req.DosenID, 10, 32)
	if err != nil {
		code := "[HANDLER] EditReviewDosen - 3.5"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	reqEntity := entity.ReviewDosenEntity{
		UserID:    uint(userID),
		DosenID:   uint(dosenId),
		Matkul:    req.Matkul,
		Content:   req.Content,
		Rating:    req.Rating,
		CreatedAt: time.Now(),
	}
	fmt.Printf("dosenId = %d\n", reqEntity.DosenID)

	err = rd.reviewDosenService.EditReviewDosen(c.Context(), reqEntity)
	if err != nil {
		code := "[HANDLER] EditReviewDosen - 4"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Content edited successfully"
	defaultSuccessResponse.Data = nil

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func (rd *reviewDosenHandler) DeleteReviewDosen(c *fiber.Ctx) error {
	claims := c.Locals("user").(*entity.JwtData)
	if claims.UserID == 0 {
		code := "[HANDLER] DeleteReviewDosen - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "Unauthorized access"

		return c.Status(fiber.StatusUnauthorized).JSON(errorResp)
	}

	userID := claims.UserID
	idParam := c.Params("dosenId")
	dosenID, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] DeleteReviewDosen - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	err = rd.reviewDosenService.DeleteReviewDosen(c.Context(), dosenID, int64(userID))
	if err != nil {
		code := "[HANDLER] EditReviewDosen - 3"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Content edited successfully"
	defaultSuccessResponse.Data = nil

	return c.Status(fiber.StatusCreated).JSON(defaultSuccessResponse)
}

func NewReviewDosenHandler(reviewDosenService service.ReviewDosenService) ReviewDosenHandler {
	return &reviewDosenHandler{
		reviewDosenService: reviewDosenService,
	}
}
