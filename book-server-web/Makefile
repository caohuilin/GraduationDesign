build-api:
	echo build version $(VERSION)
	GOOS=linux go build
	docker build -t registry.cn-hangzhou.aliyuncs.com/nomad/hello:book-server-web-$(VERSION) .
	docker push registry.cn-hangzhou.aliyuncs.com/nomad/hello:book-server-web-$(VERSION)

build:
	cd ../book-server-v2 && make gen
	cp ../book-server-v2/proto/v1/BookService.swagger.json static/api.json
	cp /Users/wkc/lab/swagger-ui/dist/* static/
	cp files/index.html static/
	go-bindata-assetfs static

VERSION:=2