package app

import (
	"context"
"log"
	"os/signal"
	"syscall"
	"time"

	"github.com/ThePlatypus-Person/KampusKita/config"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/ThePlatypus-Person/KampusKita/lib/auth"
	"github.com/ThePlatypus-Person/KampusKita/lib/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"os"
)

func RunServer() {
	cfg := config.NewConfig()
	db, err := cfg.ConnectionPostgres()
	if err != nil {
		log.Fatal("Error connecting to database: %v", err)
		return
	}

	err = os.MkdirAll("./temp/content", 0755)
	if err != nil {
		log.Fatal("Error creating temp directory: %v", err)
		return
	}

	jwt := auth.NewJwt(cfg)
	middlewareAuth := middleware.NewMiddleware(cfg)

	// Repository
	authrepo := repository.NewAuthRepository(db.DB)
	kampusrepo := repository.NewKampusRepository(db.DB)
	reviewKampusrepo := repository.NewReviewKampusRepository(db.DB)
	likeDislikeRepo := repository.NewLikeDislikeKampusRepository(db.DB)
	dosenrepo := repository.NewDosenRepository(db.DB)
	userrepo := repository.NewUserRepository(db.DB)
	verifyrepo := repository.NewVerifyRepository(db.DB)
	reviewDosenrepo := repository.NewReviewDosenRepository(db.DB)
	likeDislikeDosenRepo := repository.NewLikeDislikeDosenRepository(db.DB)
	kpMapRepo := repository.NewKpMapRepository(db.DB)

	// Service
	authService := service.NewAuthService(authrepo, cfg, jwt)
	kampusService := service.NewKampusService(kampusrepo, reviewKampusrepo, cfg)
	prodiService := service.NewProdiService(kampusrepo, cfg)
	reviewKampusService := service.NewReviewKampusService(reviewKampusrepo, cfg)
	likeDislikeService := service.NewLikeDislikeKampusService(likeDislikeRepo)
	dosenService := service.NewDosenService(dosenrepo)
	userService := service.NewUserService(userrepo, cfg, jwt)
	verifyService := service.NewVerifyService(verifyrepo, kpMapRepo, userrepo)
	reviewDosenService := service.NewReviewDosenService(reviewDosenrepo)
	likeDislikeDosenService := service.NewLikeDislikeDosenService(likeDislikeDosenRepo)

	// Handler
	authHandler := handler.NewAuthHandler(authService)
	kampusHandler := handler.NewKampusHandler(kampusService)
	prodiHandler := handler.NewProdiHandler(prodiService)
	reviewHandler := handler.NewReviewKampusHandler(reviewKampusService)
	likeDislikeHandler := handler.NewLikeDislikeKampusHandler(likeDislikeService)
	dosenHandler := handler.NewDosenHandler(dosenService)
	userHandler := handler.NewUserHandler(userService)
	verifyHandler := handler.NewVerifyHandler(verifyService)
	reviewDosenHandler := handler.NewReviewDosenHandler(reviewDosenService)
	likeDislikeDosenHandler := handler.NewLikeDislikeDosenHandler(likeDislikeDosenService)

	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${ip} ${status} - ${latency} ${method} ${path}\n",
	}))

	api := app.Group("/api")

	authApp := api.Group("/auth")
	authApp.Post("/login", authHandler.Login)

	userApp := api.Group("/user")
	userApp.Use(middlewareAuth.CheckToken())
	userApp.Put("/change_username", userHandler.ChangeUsername)
	userApp.Post("/verify", verifyHandler.Verify)
	userApp.Get("/verify/status", verifyHandler.GetVerifyStatus)
	userApp.Delete("/delete", userHandler.DeleteUser)

	kampusApp := api.Group("/kampus")
	KampusApptoken := kampusApp.Group("/token")
	KampusApptoken.Use(middlewareAuth.CheckToken())

	// Serve images
	app.Static("/public/", "./public/images")

	// Dashboard
	dashboardApp := api.Group("/dashboard")
	dashboardApp.Get("/verify", verifyHandler.GetAllVerifyRequest)
	dashboardApp.Post("/verify/:nim", verifyHandler.ApproveVerifyRequest)
	dashboardApp.Delete("/verify/:nim", verifyHandler.RejectVerifyRequest)

	//Prodi
	api.Get("/prodi/:kampusID", prodiHandler.GetProdiByKampusID)

	//Kampus
	kampusApp.Get("/", kampusHandler.GetKampus)
	kampusApp.Get("/search", kampusHandler.SearchKampus)
	kampusApp.Get("/:kampusID", kampusHandler.GetKampusByID)
	kampusApp.Get("/:kampusID/dosen", kampusHandler.GetDosenByKampusID)
	kampusApp.Get("/top/fasilitas", kampusHandler.GetTopFasilitasKampus)

	//Kampus Review
	KampusApptoken.Post("/review", reviewHandler.CreateReviewKampus)
	KampusApptoken.Post("/:kampusID/review/:reviewId/like", likeDislikeHandler.AddLikeKampus)
	KampusApptoken.Post("/:kampusID/review/:reviewId/dislike", likeDislikeHandler.AddDislikeKampus)
	KampusApptoken.Get("/:kampusID/review", reviewHandler.GetReviewKampusById)
	KampusApptoken.Get("/:kampusID/review/status", reviewHandler.GetReviewStatusById)
	KampusApptoken.Get("/:kampusID/review", reviewHandler.GetReviewData)
	KampusApptoken.Put("/review", reviewHandler.EditReview)
	KampusApptoken.Delete("/:kampusID/review", reviewHandler.DeleteReview)

	//dosen
	dosenApp := api.Group("/dosen")
	dosenAppToken := dosenApp.Group("/token")
	dosenAppToken.Use(middlewareAuth.CheckToken())

	dosenAppToken.Post("/review", reviewDosenHandler.CreateReviewDosen)
	dosenAppToken.Post("/:kampusID/review/:reviewDosenId/like", likeDislikeDosenHandler.AddLikeDosen)
	dosenAppToken.Post("/:kampusID/review/:reviewDosenId/dislike", likeDislikeDosenHandler.AddDislikeDosen)
	dosenAppToken.Get("/:dosenId/reviews", reviewDosenHandler.GetReviewDosenById)
	dosenAppToken.Get("/:dosenId/review", reviewDosenHandler.GetReviewData)
	dosenAppToken.Get("/:dosenId/review/status", reviewDosenHandler.GetReviewStatusById)
	dosenAppToken.Put("/review", reviewDosenHandler.EditReviewDosen)
	dosenAppToken.Delete("/:dosenId/review", reviewDosenHandler.DeleteReviewDosen)

	dosenApp.Get("/search", dosenHandler.SearchDosen)
	dosenApp.Get("/top", dosenHandler.GetTopDosen)
	dosenApp.Get("/:dosenId", dosenHandler.GetDosenByID)

	// Start server
	log.Println("Starting server on port:", cfg.App.AppPort)
	if cfg.App.AppPort == "" {
		cfg.App.AppPort = os.Getenv("APP_PORT")
	}

	err = app.Listen(":" + cfg.App.AppPort)
	if err != nil {
		log.Fatal("Error starting server: %v", err)
	}

	go func() {
		if cfg.App.AppPort == "" {
			cfg.App.AppPort = os.Getenv("APP_PORT")
		}

		err := app.Listen(":" + cfg.App.AppPort)
		if err != nil {
			log.Fatal("Error starting server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	signal.Notify(quit, syscall.SIGTERM)

	<-quit

	log.Println("server shutdown of 5 seconds")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	app.ShutdownWithContext(ctx)
}
