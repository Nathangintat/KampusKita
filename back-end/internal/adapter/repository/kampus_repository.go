package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type KampusRepository interface {
	GetKampus(ctx context.Context) ([]entity.KampusEntity, error)
	GetKampusByID(ctx context.Context, id int64) (*entity.KampusEntity, error)
	GetProdiByKampusID(ctx context.Context, id int64) ([]entity.ProdiEntity, error)
	SearchKampus(ctx context.Context, keyword string) ([]entity.KampusEntity, error)
	GetDosenByKampusID(ctx context.Context, id int64) ([]entity.DosenItemEntity, error)
	GetTopFasilitasKampus(ctx context.Context) ([]entity.RankingKampusEntity, error)
}

type kampusRepository struct {
	db *gorm.DB
}

func (k *kampusRepository) SearchKampus(ctx context.Context, keyword string) ([]entity.KampusEntity, error) {
	var modelKampus []model.Kampus

	err := k.db.WithContext(ctx).
		Where("LOWER(nama) LIKE LOWER(?) OR LOWER(nama_singkat) LIKE LOWER(?)", "%"+keyword+"%", "%"+keyword+"%").
		Find(&modelKampus).Error

	if err != nil {
		code := "[REPOSITORY] SearchKampus - 1"
		log.Errorw(code, err)
		return nil, err
	}

	resps := []entity.KampusEntity{}

	for _, val := range modelKampus {
		resp := entity.KampusEntity{
			ID:          int64(val.ID),
			Nama:        val.Nama,
			NamaSingkat: val.NamaSingkat,
			Akreditasi:  val.Akreditasi,
		}
		resps = append(resps, resp)
	}

	return resps, err
}

func (k *kampusRepository) GetKampus(ctx context.Context) ([]entity.KampusEntity, error) {
	var modelKampus []model.Kampus

	err := k.db.Preload(clause.Associations).Find(&modelKampus).Error
	if err != nil {
		code := "[REPOSITORY] GetAllKampus - 1"
		log.Errorw(code, err)
		return nil, err
	}

	resps := []entity.KampusEntity{}
	for _, val := range modelKampus {
		resp := entity.KampusEntity{
			ID:          int64(val.ID),
			Nama:        val.Nama,
			NamaSingkat: val.NamaSingkat,
			Akreditasi:  val.Akreditasi,
		}
		resps = append(resps, resp)
	}
	return resps, nil
}

func (k *kampusRepository) GetKampusByID(ctx context.Context, id int64) (*entity.KampusEntity, error) {
	var modelKampus model.KampusComplete

	err := k.db.Table("kampus").
		Select(`
			kampus.id,
			kampus.nama,
			kampus.akreditasi,
			COUNT(dosen.id) AS jumlah_dosen
    	`).
		Joins("JOIN kp_map ON kp_map.kampus_id = kampus.id").
		Joins("JOIN dosen ON dosen.kp_id = kp_map.id").
		Where("kp_map.kampus_id = ?", id).
		Group("kampus.id").
		Limit(1).
		Scan(&modelKampus).Error

	if err != nil {
		code = "[REPOSITORY] GetKampusById - 1"
		log.Errorw(code, err)
		return nil, err
	}

	resp := entity.KampusEntity{
		ID:         int64(modelKampus.ID),
		Nama:       modelKampus.Nama,
		Akreditasi: modelKampus.Akreditasi,
		JumlahDosen: int64(modelKampus.JumlahDosen),
	}

	return &resp, nil
}

func (k *kampusRepository) GetDosenByKampusID(ctx context.Context, kampusId int64) ([]entity.DosenItemEntity, error) {

	var dosens []model.Dosen

	err := k.db.
		Preload("KPMap.Prodi").
		Joins("JOIN kp_map ON kp_map.id = dosen.kp_id").
		Where("kp_map.kampus_id = ?", kampusId).
		Find(&dosens).Error

	if err != nil {
		code = "[REPOSITORY] GetDosenByKampusId - 1"
		log.Errorw(code, err)
		return nil, err
	}

	var result []entity.DosenItemEntity
	for _, d := range dosens {
		var avgRating float64
		err := k.db.Model(&model.ReviewDosen{}).
			Where("dosen_id = ?", d.ID).
			Select("COALESCE(AVG(rating), 0)").Scan(&avgRating).Error

		if err != nil {
			code = "[REPOSITORY] GetDosenByKampusId - 2"
			log.Errorw(code, err)
			return nil, err
		}

		result = append(result, entity.DosenItemEntity{
			DosenId: d.ID,
			Nama:    d.Nama,
			Prodi:   d.KPMap.Prodi.Nama,
			Rating:  avgRating,
		})
	}

	return result, nil

}

func (k *kampusRepository) GetTopFasilitasKampus(ctx context.Context) ([]entity.RankingKampusEntity, error) {
	rankingList := []entity.RankingKampusEntity{}

	err := k.db.Table("kampus").
		Select(`
        kampus.id AS kampus_id,
        kampus.nama,
        kampus.nama_singkat,
        COALESCE(AVG(review_kampus.rating_fasilitas), 0) AS total
    	`).
		Joins("LEFT JOIN kp_map ON kp_map.id = kampus.id").
		Joins("LEFT JOIN review_kampus ON review_kampus.kp_id = kp_map.id").
		Group("kampus.id, kampus.nama, kampus.nama_singkat").
		Order("total DESC, kampus.nama ASC").
		//Limit(5).
		Scan(&rankingList).Error

	if err != nil {
		code = "[REPOSITORY] GetTopFasilitasKampus - 1"
		log.Errorw(code, err)
		return nil, err
	}

	for i := range rankingList {
		rankingList[i].Ranking = i + 1
	}

	return rankingList, nil
}

func (k *kampusRepository) GetProdiByKampusID(ctx context.Context, id int64) ([]entity.ProdiEntity, error) {
	var prodiList []model.Prodi

	err := k.db.Table("prodi").
		Select(`
			prodi.id,
			prodi.nama
    	`).
		Joins("JOIN kp_map ON kp_map.prodi_id = prodi.id").
		Where("kp_map.kampus_id = ?", id).
		Scan(&prodiList).Error

	if err != nil {
		code = "[REPOSITORY] GetProdiByKampusID - 1"
		log.Errorw(code, err)
		return nil, err
	}

	var result []entity.ProdiEntity
	for _, d := range prodiList {
		result = append(result, entity.ProdiEntity{
			ID: int64(d.ID),
			Nama:    d.Nama,
		})
	}

	return result, nil
}

func NewKampusRepository(db *gorm.DB) KampusRepository {
	return &kampusRepository{db: db}
}
