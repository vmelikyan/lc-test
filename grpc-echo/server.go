package main
import "google.golang.org/grpc/reflection"

import (
	"context"
	"log"
	"net"
	echo "grpc-echo/pkg/echo" // This imports the generated protobuf code
	"google.golang.org/grpc"
)

// server is our implementation of the gRPC server
type server struct {
	echo.UnimplementedSimpleServiceServer
}

// Echo is the RPC function as defined in our .proto file
// It just returns the same value it receives.
func (s *server) Echo(ctx context.Context, in *echo.SimpleRequest) (*echo.SimpleResponse, error) {
	return &echo.SimpleResponse{Value: in.GetValue()}, nil
}

func main() {
	// Create a new gRPC server
	lis, err := net.Listen("tcp", ":8090")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()

	// Register our service with the gRPC server
	echo.RegisterSimpleServiceServer(s, &server{})
  reflection.Register(s)

	// Start the gRPC server
	log.Println("Starting server on port :8090...")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

