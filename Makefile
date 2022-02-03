DEV := $(filter dev,$(MAKECMDGOALS))
PROD := $(filter prod,$(MAKECMDGOALS))

YARN ?= $(shell which yarn)

PULUMI ?= $(shell which pulumi)
PULUMI_ENV ?= $(if $(PROD),prod,dev)
PULUMI_STACK ?= LukeShay/lukeandjadi.com
PULUMI_FLAGS ?= --yes --debug

.PHONY: pulumi
pulumi:
	@cd pulumi && \
		$(PULUMI) update $(PULUMI_FLAGS) --stack "$(PULUMI_STACK)/$(PULUMI_ENV)"

.PHONY: dev
dev:

.PHONY: prod
prod:

.PHONY: croach
croach:
	@cockroach sql --url "postgresql://luke:$(DB_PASS)@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=$(HOME)/.postgresql/root.crt&options=--cluster%3Dlukeandjadi-dev-2687"
