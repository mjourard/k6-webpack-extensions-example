FROM golang:1.17-alpine as builder
RUN apk --no-cache add git gcc musl-dev && \
    go install go.k6.io/xk6/cmd/xk6@latest && \
    CGO_ENABLED=1 xk6 build master --with github.com/grafana/xk6-sql

FROM alpine:3.15
RUN  apk add --no-cache ca-certificates && \
    adduser -D -u 12345 -g 12345 k6 && \
    apk add bash

COPY --from=builder /go/k6 /usr/bin/k6

# FROM loadimpact/k6:0.36.0

# USER root 

# RUN apk add bash

USER 12345
WORKDIR /home/k6
ENTRYPOINT [ "k6" ]
# copy the built files into the container
COPY ./dist /home/k6/dist
COPY ./data /home/k6/data
