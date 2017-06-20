gen: lint
	protoc -I/Users/wkc/lab/micro-test2/src \
		-I/usr/local/include \
		-I/Users/wkc/lab/micro-test2/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
		--swagger_out=logtostderr=true:/Users/wkc/lab/micro-test2/src \
		--go_out=plugins=micro:/Users/wkc/lab/micro-test2/src \
		/Users/wkc/lab/micro-test2/src/git.oschina.net/wkc/book-server-v2/proto/v1/BookService.proto
	node proto/v1/fix_swagger.js

build-api: lint
	echo build version $(VERSION)
	GOOS=linux go build
	docker build -t registry.cn-hangzhou.aliyuncs.com/nomad/hello:book-server-v2-$(VERSION) .
	docker push registry.cn-hangzhou.aliyuncs.com/nomad/hello:book-server-v2-$(VERSION)

lint:
	python3 lint.py

VERSION:=1
