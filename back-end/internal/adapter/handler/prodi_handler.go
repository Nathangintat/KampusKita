package handler

import (
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler/response"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/ThePlatypus-Person/KampusKita/lib/conv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type ProdiHandler interface {
	GetProdiByKampusID(c *fiber.Ctx) error
}

type prodiHandler struct {
	prodiService service.ProdiService
}

func (kh *prodiHandler) GetProdiByKampusID(c *fiber.Ctx) error {
	idParam := c.Params("kampusID")
	kampusID, err := conv.StringToInt64(idParam)
	if err != nil {
		code := "[HANDLER] GetProdiByKampusID - 1"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusBadRequest).JSON(errorResp)
	}

	result, err := kh.prodiService.GetProdiByKampusID(c.Context(), kampusID)
	if err != nil {
		code := "[HANDLER] GetProdiByKampusID - 2"
		log.Errorw(code, err)
		errorResp.Meta.Status = false
		errorResp.Meta.Message = err.Error()

		return c.Status(fiber.StatusInternalServerError).JSON(errorResp)
	}

	defaultSuccessResponse.Meta.Status = true
	defaultSuccessResponse.Meta.Message = "Success"

	respProdiById := []response.ProdiItemResponse{}
	for _, prodi := range result {
		respProdi := response.ProdiItemResponse{
			ID: int64(prodi.ID),
			Nama: prodi.Nama,
		}

		respProdiById = append(respProdiById, respProdi)
	}

	defaultSuccessResponse.Data = respProdiById
	return c.JSON(defaultSuccessResponse)
}

func NewProdiHandler(prodiService service.ProdiService) ProdiHandler {
	return &prodiHandler{
		prodiService: prodiService,
	}
}
