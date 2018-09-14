.PHONY: all
all: gen


.PHONY: start
start:
	@npm start

.PHONY: gen
gen:
	@./gen.sh

.PHONY: lint/fix
lint/fix:
	@find proxy -type f -name '*.js' | xargs standard --fix
	@find src -type f -name '*.js' | xargs standard --fix
