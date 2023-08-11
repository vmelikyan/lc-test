# Start from the official Go image to build the server binary
FROM golang:1.17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the server binary
RUN CGO_ENABLED=0 GOOS=linux go build -o grpc-server ./server.go

# Start a new stage from scratch for a smaller image size
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /root/

# Copy the binary from the previous stage
COPY --from=builder /app/grpc-server .

# Expose the server's port
EXPOSE 50051

# Command to run the server
CMD ["./grpc-server"]
