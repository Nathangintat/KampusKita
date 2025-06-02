package repository

import (
	"context"

	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/entity"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/domain/model"
	"github.com/gofiber/fiber/v2/log"
	"gorm.io/gorm"
)

type DosenRepository interface {
	GetDosenByID(ctx context.Context, id int64) (*entity.DosenEntity, error)
	SearchDosen(ctx context.Context, keyword string) ([]entity.SearchDosenEntity, error)
	GetTopDosen(ctx context.Context) ([]entity.RankingDosenEntity, error)
}
type dosenRepository struct {
	db *gorm.DB
}

func (d *dosenRepository) GetDosenByID(ctx context.Context, dosenId int64) (*entity.DosenEntity, error) {

	var dosen model.Dosen

	err := d.db.WithContext(ctx).
		Preload("KPMap.Prodi").
		Preload("KPMap.Kampus").
		First(&dosen, dosenId).Error

	if err != nil {
		code := "[REPOSITORY] GetDosenById - 1"
		log.Errorw(code, err)
		return nil, err
	}

	var avgRating float64
	err = d.db.WithContext(ctx).
		Model(&model.ReviewDosen{}).
		Select("COALESCE(AVG(rating), 0)").
		Where("dosen_id = ?", dosenId).
		Scan(&avgRating).Error

	if err != nil {
		code := "[REPOSITORY] GetDosenById - 1"
		log.Errorw(code, err)
		return nil, err
	}

	response := entity.DosenEntity{
		ID:     	dosen.ID,
		Nama:   	dosen.Nama,
		KampusId:   dosen.KPMap.Kampus.ID,
		Rating: 	avgRating,
		Prodi:  	dosen.KPMap.Prodi.Nama,
		Kampus: 	dosen.KPMap.Kampus.Nama,
	}

	return &response, nil
}

func (d *dosenRepository) SearchDosen(ctx context.Context, q string) ([]entity.SearchDosenEntity, error) {
	var dosenModels []model.Dosen

	err := d.db.
		Preload("KPMap").
		Preload("KPMap.Kampus").
		Preload("KPMap.Prodi").
		Where("nama ILIKE ?", "%"+q+"%").
		Find(&dosenModels).Error

	if err != nil {
		code := "[REPOSITORY] SearchDosen - 1"
		log.Errorw(code, err)
		return nil, err
	}

	var result []entity.SearchDosenEntity
	for _, dosen := range dosenModels {

		var avgRating float64
		err = d.db.WithContext(ctx).
			Model(&model.ReviewDosen{}).
			Select("COALESCE(AVG(rating), 0)").
			Where("dosen_id = ?", dosen.ID).
			Scan(&avgRating).Error

		if err != nil {
			code := "[REPOSITORY] SearchDosen - 2"
			log.Errorw(code, err)
			return nil, err
		}

		result = append(result, entity.SearchDosenEntity{
			DosenId: dosen.ID,
			Nama:    dosen.Nama,
			Kampus:  dosen.KPMap.Kampus.Nama,
			Prodi:   dosen.KPMap.Prodi.Nama,
			Rating:  avgRating,
		})
	}

	return result, nil
}

func (d *dosenRepository) GetTopDosen(ctx context.Context) ([]entity.RankingDosenEntity, error) {
	var rankingList []entity.RankingDosenEntity

	err := d.db.Table("dosen").
		Select(`
		dosen.id AS dosen_id, 
		dosen.nama AS nama,
		k.nama AS kampus, 
		COALESCE(AVG(rd.rating), 0) AS rating
		`).
		Joins(`LEFT JOIN kp_map AS kp ON kp.id = dosen.kp_id`).
		Joins(`LEFT JOIN kampus AS k ON k.id = kp.kampus_id`).
		Joins(`LEFT JOIN review_dosen AS rd ON rd.dosen_id = dosen.id`).
		Group("dosen.id, dosen.nama, k.nama").
		Order("rating DESC").
		Limit(5).
		Scan(&rankingList).Error

	if err != nil {
		code = "[REPOSITORY] GetTopDosen - 1"
		log.Errorw(code, err)
		return nil, err
	}

	for i := range rankingList {
		rankingList[i].Ranking = i + 1
	}

	return rankingList, nil
}

func NewDosenRepository(db *gorm.DB) DosenRepository {
	return &dosenRepository{db: db}
}
