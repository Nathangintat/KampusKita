package app

import (
	"context"
	"github.com/ThePlatypus-Person/KampusKita/config"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/handler"
	"github.com/ThePlatypus-Person/KampusKita/internal/adapter/repository"
	"github.com/ThePlatypus-Person/KampusKita/internal/core/service"
	"github.com/ThePlatypus-Person/KampusKita/lib/auth"
	"github.com/ThePlatypus-Person/KampusKita/lib/middleware"
	"log"
	"os/signal"
	"syscall"
	"time"

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
	userRepo := repository.NewUserRepository(db.DB)

	// Service
	authService := service.NewAuthService(authrepo, cfg, jwt)
	userService := service.NewUserService(userRepo)

	// Handler
	authHandler := handler.NewAuthHandler(authService)
	userHandler := handler.NewUserHandler(userService)

	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${ip} ${status} - ${latency} ${method} ${path}\n",
	}))

	api := app.Group("/api")
	api.Post("/login", authHandler.Login)

	adminApp := api.Group("/admin")
	adminApp.Use(middlewareAuth.CheckToken())
	//
	//// Category
	//categoryApp := adminApp.Group("/categories")
	//categoryApp.Get("/", categoryHandler.GetCategories)
	//categoryApp.Post("/", categoryHandler.CreateCategory)
	//categoryApp.Put("/:categoryID", categoryHandler.EditCategoryByID)
	//categoryApp.Get("/:categoryID", categoryHandler.GetCategoryByID)
	//categoryApp.Delete("/:categoryID", categoryHandler.DeleteCategory)
	//
	//// Content
	//contentApp := adminApp.Group("/contents")
	//contentApp.Get("/", contentHandler.GetContents)
	//contentApp.Post("/", contentHandler.CreateContent)
	//contentApp.Put("/:contentID", contentHandler.UpdateContent)
	//contentApp.Get("/:contentID", contentHandler.GetContentByID)
	//contentApp.Delete("/:contentID", contentHandler.DeleteContent)
	//contentApp.Post("/upload-image", contentHandler.UploadImageR2)
	//
	//// User
	//userApp := adminApp.Group("/users")
	//userApp.Get("/profile", userHandler.GetUserByID)
	//userApp.Put("/update-password", userHandler.UpdatePassword)
	//
	//// FE
	//feApp := api.Group("/fe")
	//feApp.Get("/categories", categoryHandler.GetCategoryFE)
	//feApp.Get("/contents", contentHandler.GetContentWithQuery)
	//feApp.Get("/contents/:contentID", contentHandler.GetContentDetail)

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
