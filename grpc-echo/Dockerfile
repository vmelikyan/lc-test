# Start from the official Go image to build the server binary
FROM golang:1.17 AS builder

WORKDIR /app

COPY grpc-echo/go.mod grpc-echo/go.sum ./

RUN go mod download

COPY grpc-echo/ ./

RUN CGO_ENABLED=0 GOOS=linux go build -o grpc-server ./server.go

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/grpc-server .

EXPOSE 8090

CMD ["./grpc-server"]

