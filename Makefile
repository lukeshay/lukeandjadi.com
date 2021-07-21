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
