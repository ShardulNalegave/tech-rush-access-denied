FROM golang

WORKDIR /usr/src/mosaicify-backend

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /usr/local/bin/mosaicify-backend ./main.go

ENV MOSAICIFY_PORT=8080

CMD [ "mosaicify-backend" ]