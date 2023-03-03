LAST_TAG_COMMIT := $(shell git rev-list --tags --max-count=1)
LAST_TAG := $(shell git describe --tags $(LAST_TAG_COMMIT))
LAST_COMMIT := $(shell git rev-parse HEAD)

ifeq ($(LAST_COMMIT),$(LAST_TAG_COMMIT))
	TAG := $(LAST_TAG)
else
	TAG := $(LAST_COMMIT)
endif

base_package:
	docker build --file front-node.dockerfile -t front-node:latest . --no-cache

requirements:
	docker build --file front-dependencies.dockerfile -t front-deps:latest . --no-cache

production:
	docker build --file final-front.dockerfile -t final-front:$(TAG) -t final-front:latest . --no-cache