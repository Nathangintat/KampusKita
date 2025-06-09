package handler

import (
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/response"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/ThePlatypus-Person/KampusKita/lib/conv"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type DosenHandler interface {
	GetDosenByID(c *fiber.Ctx) error
	SearchDosen(c *fiber.Ctx) error
	GetTopDosen(c *fiber.Ctx) error
}

type dosenHandler struct {
	dosenService service.DosenService
}

func (dh *dosenHandler) GetDosenByID(c *fiber.Ctx) error {
	idParam := c.Params("dosenId")
	dosenId, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] GetDosenByID - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	results, err := dh.dosenService.GetDosenByID(c.Context(), dosenId)
	if err != nil {
		code := "[HANDLER] GetDosenByid - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respDosen := response.DosenResponse{
		ID:     	results.ID,
		Nama:   	results.Nama,
		KampusId:   results.KampusId,
		Rating: 	results.Rating,
		Prodi:  	results.Prodi,
		Kampus: 	results.Kampus,
	}

	defaultSuccessResponse.Data = respDosen
	return c.JSON(defaultSuccessResponse)
}

func (dh *dosenHandler) SearchDosen(c *fiber.Ctx) error {

	keyword := c.Query("q")
	if keyword == "" {
		code := "[HANDLER] SearchDosen - 1"
		log.Errorw(code)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = "need query"

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	results, err := dh.dosenService.SearchDosen(c.Context(), keyword)
	if err != nil {
		code := "[HANDLER] SearchDosen - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respSearch := []response.SearchDosenItemResponse{}
	for _, dosen := range results {
		respDosenSearch := response.SearchDosenItemResponse{
			DosenID: dosen.DosenId,
			Nama:    dosen.Nama,
			Rating:  dosen.Rating,
			Prodi:   dosen.Prodi,
			Kampus:  dosen.Kampus,
		}

		respSearch = append(respSearch, respDosenSearch)
	}

	defaultSuccessResponse.Data = respSearch
	return c.JSON(defaultSuccessResponse)
}

func (dh *dosenHandler) GetTopDosen(c *fiber.Ctx) error {
	results, err := dh.dosenService.GetTopDosen(c.Context())
	if err != nil {
		code := "[HANDLER] GetTopDosen - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respAllTopDosen := []response.RankingDosenResponse{}
	for _, topDosen := range results {
		respTopDosen := response.RankingDosenResponse{
			DosenID: topDosen.DosenID,
			Ranking: topDosen.Ranking,
			Nama:    topDosen.Nama,
			Kampus:  topDosen.Kampus,
		}

		respAllTopDosen = append(respAllTopDosen, respTopDosen)
	}

	defaultSuccessResponse.Data = respAllTopDosen
	return c.JSON(defaultSuccessResponse)
}

func NewDosenHandler(dosenService service.DosenService) DosenHandler {
	return &dosenHandler{
		dosenService: dosenService,
	}
}
