package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type KpMapRepository interface {
	GetKpID(ctx context.Context, kampusId int64, prodiId int64) (*entity.KpMap, error)
}

type kpMapRepository struct {
	db *gorm.DB
}

func (k *kpMapRepository) GetKpID(ctx context.Context, kampusId int64, prodiId int64) (*entity.KpMap, error) {
	var modelKpMap model.KPMap

	err := k.db.Table("kp_map").
		Select(`
			id,
			kampus_id,
			prodi_id
    	`).
		Where("kampus_id = ? AND prodi_id = ?", kampusId, prodiId).
		Limit(1).
		Scan(&modelKpMap).Error

	if err != nil {
		code = "[REPOSITORY] GetKpID - 1"
		log.Errorw(code, err)
		return nil, err
	}

	resp := entity.KpMap{
		ID:         int64(modelKpMap.ID),
		KampusID: 	int64(modelKpMap.KampusId),
		ProdiID: 	int64(modelKpMap.ProdiId),
	}

	return &resp, nil
}

func NewKpMapRepository(db *gorm.DB) KpMapRepository {
	return &kpMapRepository{db: db}
}
