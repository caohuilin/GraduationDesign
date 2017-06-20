package main

import (
	"log"
	"time"

	"git.oschina.net/wkc/book-server-v2/handler"
	"github.com/micro/go-micro"

	proto "git.oschina.net/wkc/book-server-v2/proto/v1"
)

func main() {
	// New Service
	service := micro.NewService(
		micro.Name("go.micro.srv.book-server-v2"),
		micro.Version("latest"),
		micro.RegisterTTL(time.Second*10),
		micro.RegisterInterval(time.Second),
	)

	// Register Handler
	cfg := handler.Config{
		MgoURL:       "localhost:27017",
		DatabaseName: "book_service",
		JwtToken:     "Oi9j4aoHoLTuNUkYiuPA1A",
	}
	h, err := handler.New(cfg)
	if err != nil {
		log.Fatal(err)
	}
	proto.RegisterBookServiceHandler(service.Server(), h)

	// Initialise service
	service.Init()

	// Run service
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}
