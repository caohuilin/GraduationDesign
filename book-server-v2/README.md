# Book-Server-V2 Srv

This is the Book-Server-V2 service with fqdn go.micro.srv.book-server-v2.

## Getting Started

### Prerequisites

Install Consul
[https://www.consul.io/intro/getting-started/install.html](https://www.consul.io/intro/getting-started/install.html)

Run Consul
```
$ consul agent -dev -advertise=127.0.0.1
```

### Run Service

```
$ go run main.go
```

### Building a container

If you would like to build the docker container do the following
```
CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w' -o book-server-v2-srv ./main.go
docker build -t book-server-v2-srv .

```

### 数据库下载地址
http://q.hi-hi.cn/book-spider-20170402.tar.gz
