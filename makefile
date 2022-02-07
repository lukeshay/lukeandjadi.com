DEV := $(filter dev,$(MAKECMDGOALS))
PROD := $(filter prod,$(MAKECMDGOALS))

YARN ?= $(shell which yarn)

PULUMI ?= $(shell which pulumi)
PULUMI_ENV ?= $(if $(PROD),prod,dev)
PULUMI_STACK ?= LukeShay/lukeandjadi.com
PULUMI_FLAGS ?= --yes --debug

UNAME_S := $(shell uname -s)
UNAME_P := $(shell uname -p)

ifeq ($(UNAME_S),Linux)
		OS = linux
endif
ifeq ($(UNAME_S),Darwin)
		OS = macos
endif

ifeq ($(filter %86,$(UNAME_P)),)
		ARCH = amd64
endif
ifneq ($(UNAME_P),x86_64)
		ARCH = amd64
endif
ifneq ($(filter arm%,$(UNAME_P)),)
		ARCH = arm64
endif

DBMATE_BINARY ?= dbmate-$(OS)-$(ARCH)

DBMATE ?= $(PWD)/db/bin/$(DBMATE_BINARY)

.PHONY: dev
dev:

.PHONY: prod
prod:

.PHONY: install-dbmate
install-dbmate:
	@curl --create-dirs -fsSL -o "$(DBMATE)" https://github.com/amacneil/dbmate/releases/latest/download/$(DBMATE_BINARY)
	@chmod +x "$(DBMATE)"

$(DBMATE):
	@ls "$(DBMATE)" || make install-dbmate

.PHONY: schema-migrate
schema-migrate: $(DBMATE)
	@$(DBMATE) --url $(MIGRATION_DSN) migrate

.PHONY: schema-down
schema-down: $(DBMATE)
	@$(DBMATE) --url $(MIGRATION_DSN) down

.PHONY: seed-migrate
seed-migrate: $(DBMATE)
	@$(DBMATE) --url $(MIGRATION_DSN) --migrations-dir db/seeds migrate

.PHONY: seed-down
seed-down: $(DBMATE)
	@$(DBMATE) --url $(MIGRATION_DSN) --migrations-dir db/seeds down

.PHONY: db-cert
db-cert:
	@curl --create-dirs -o "$(PWD)/db/certs/root.crt" -O "https://cockroachlabs.cloud/clusters/$(CLUSTER_ID)/cert"
