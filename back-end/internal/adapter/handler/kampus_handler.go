package handler

import (
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/response"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/ThePlatypus-Person/KampusKita/lib/conv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

var defaultSuccessResponse response.DefaultSuccessResponse

type KampusHandler interface {
	GetKampus(c *fiber.Ctx) error
	GetKampusByID(c *fiber.Ctx) error
	SearchKampus(c *fiber.Ctx) error
	GetDosenByKampusID(c *fiber.Ctx) error
	GetTopFasilitasKampus(c *fiber.Ctx) error
}

type kampusHandler struct {
	kampusService service.KampusService
}

func (kh *kampusHandler) GetKampus(c *fiber.Ctx) error {

	results, err := kh.kampusService.GetKampus(c.Context())
	if err != nil {
		code := "[HANDLER] GetKampus - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respAllKampus := []response.KampusResponse{}
	for _, kampus := range results {
		respKampus := response.KampusResponse{
			ID:          kampus.ID,
			Nama:        kampus.Nama,
			NamaSingkat: kampus.NamaSingkat,
			Akreditasi:  kampus.Akreditasi,
		}

		respAllKampus = append(respAllKampus, respKampus)
	}

	defaultSuccessResponse.Data = respAllKampus
	return c.JSON(defaultSuccessResponse)
}

func (kh *kampusHandler) GetKampusByID(c *fiber.Ctx) error {

	idParam := c.Params("kampusID")
	kampusID, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] GetKampusByID - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	result, ratingResult, err := kh.kampusService.GetKampusByID(c.Context(), kampusID)
	if err != nil {
		code := "[HANDLER] GetKampusByID - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respKampusById := response.KampusByIdResponse{
		KampusID:   result.ID,
		Nama:       result.Nama,
		Akreditasi: result.Akreditasi,
		Rating: &response.RatingKampusResponse{
			Fasilitas:  ratingResult.Fasilitas,
			Wifi:       ratingResult.Wifi,
			Lokasi:     ratingResult.Lokasi,
			Organisasi: ratingResult.Organisasi,
			WorthIt:    ratingResult.WorthIt,
			Total:      ratingResult.Total,
		},
	}

	defaultSuccessResponse.Data = respKampusById
	return c.JSON(defaultSuccessResponse)
}

func (kh *kampusHandler) SearchKampus(c *fiber.Ctx) error {

	keyword := c.Query("q")
	if keyword == "" {
		code := "[HANDLER] SearchKampus - 1"
		log.Errorw(code)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = " need query"

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	results, ratingResult, err := kh.kampusService.SearchKampus(c.Context(), keyword)
	if err != nil {
		code := "[HANDLER] SearchKampus - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respSearch := []response.SearchKampusItemResponse{}
	for _, kampus := range results {
		respKampusSearch := response.SearchKampusItemResponse{
			KampusID: kampus.ID,
			Nama:     kampus.Nama,
			Rating: &response.RatingKampusResponse{
				Total: ratingResult.Total,
			},
			NamaSingkat: kampus.NamaSingkat,
		}

		respSearch = append(respSearch, respKampusSearch)
	}

	defaultSuccessResponse.Data = respSearch
	return c.JSON(defaultSuccessResponse)
}

func (kh *kampusHandler) GetDosenByKampusID(c *fiber.Ctx) error {
	idParam := c.Params("kampusID")
	kampusID, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] GetDosenByKampusID - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	result, err := kh.kampusService.GetDosenByKampusID(c.Context(), kampusID)
	if err != nil {
		code := "[HANDLER] GetDosenByKampusID - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respDosenById := []response.DosenItemResponse{}
	for _, dosen := range result {
		respDosen := response.DosenItemResponse{
			DosenID: dosen.DosenId,
			Nama:    dosen.Nama,
			Rating:  dosen.Rating,
			Prodi:   dosen.Prodi,
		}

		respDosenById = append(respDosenById, respDosen)
	}

	defaultSuccessResponse.Data = respDosenById
	return c.JSON(defaultSuccessResponse)
}

func (kh *kampusHandler) GetTopFasilitasKampus(c *fiber.Ctx) error {

	results, err := kh.kampusService.GetTopFasilitasKampus(c.Context())
	if err != nil {
		code := "[HANDLER] GetTopFasilitasKampus - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respAllTopKampus := []response.RankingKampusResponse{}
	for _, topKampus := range results {
		respTopKampus := response.RankingKampusResponse{
			KampusID:    topKampus.KampusID,
			Ranking:     topKampus.Ranking,
			Nama:        topKampus.Nama,
			NamaSingkat: topKampus.NamaSingkat,
		}

		respAllTopKampus = append(respAllTopKampus, respTopKampus)
	}

	defaultSuccessResponse.Data = respAllTopKampus
	return c.JSON(defaultSuccessResponse)
}

func NewKampusHandler(kampusService service.KampusService) KampusHandler {
	return &kampusHandler{
		kampusService: kampusService,
	}
}
