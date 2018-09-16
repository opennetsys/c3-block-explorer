.PHONY: all
all: gen

.PHONY: start
start:
	@npm start

.PHONY: run
run: start

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
	@node proxy/server.js
