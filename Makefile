.PHONY: all
all: gen

.PHONY: start
start:
	@API_HOST="$(API_HOST)" npm start

.PHONY: run
run: start

.PHONY: build
build:
	@npm run build

.PHONY: build/docker
build/docker:
	@docker build -t c3blockexplorer .

.PHONY: run/docker
run/docker:
	@docker run -p 9090:3000 -p 5010:5010 -t c3blockexplorer

.PHONY: run/docker/detached
run/docker/detached:
	@docker run -p 9090:3000 -p 5010:5010 -t c3blockexplorer -d

.PHONY: gen
gen:
	@./gen.sh

.PHONY: lint/fix
lint/fix:
	@find proxy -type f -name '*.js' | xargs standard --fix
	@find src -type f -name '*.js' | xargs standard --fix

.PHONY: cp/grpc/web
cp/grpc/web:
	@cp ../c3-go/rpc/pb/c3.proto pb/
	@cp ../c3-go/rpc/pb/c3.proto src/pb/
	@cp ../c3-go/tmp/* pb/
	@cp ../c3-go/tmp/* src/pb/

.PHONY: run/proxy
run/proxy:
	@RPC_HOST="$(RPC_HOST)" node proxy/server.js

# proxy localhost to 123.123.123.123 required so that docker container can communicate with host machine
.PHONY: localhostproxy
localhostproxy:
	@sudo ifconfig $$(ifconfig | grep LOOPBACK | awk '{print $1}' | sed -E 's/[^a-zA-Z0-9]+//g') 123.123.123.123/24
	#@sudo ifconfig lo0 123.123.123.123/24
