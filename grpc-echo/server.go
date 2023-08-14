package main
import "google.golang.org/grpc/reflection"

import (
	"context"
	"log"
	"net"
	echo "grpc-echo/pkg/echo"
	"google.golang.org/grpc"
)

type server struct {
	echo.UnimplementedSimpleServiceServer
}

func (s *server) Echo(ctx context.Context, in *echo.SimpleRequest) (*echo.SimpleResponse, error) {
	return &echo.SimpleResponse{Value: in.GetValue()}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()

	echo.RegisterSimpleServiceServer(s, &server{})
  reflection.Register(s)

	log.Println("Starting server on port :8080...")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

