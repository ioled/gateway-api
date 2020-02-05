VERSION := $$(cat package.json | grep version | sed 's/"/ /g' | awk {'print $$3'})

PROD := env.json
DEV := env-dev.json
ENV := $(DEV)

MONGO_URI := $$(cat $(ENV) | grep MONGO_URI | sed 's/"/ /g' | awk {'print $$3'})
HISTORY_URL := $$(cat $(ENV) | grep HISTORY_URL | sed 's/"/ /g' | awk {'print $$3'})
DEVICE_CONTROL_URL := $$(cat $(ENV) | grep DEVICE_CONTROL_URL | sed 's/"/ /g' | awk {'print $$3'})
JWT_KEY := $$(cat $(ENV) | grep JWT_KEY | sed 's/"/ /g' | awk {'print $$3'})
GOOGLE_CLIENT_SECRET := $$(cat $(ENV) | grep GOOGLE_CLIENT_SECRET | sed 's/"/ /g' | awk {'print $$3'})

SVC=ioled-gateway-api
PORT=3000

version v:
	@echo $(VERSION)

init i:
	@echo "[Dependencies] Installing dependencies"
	@npm install

docker:
	@echo [Docker] Building docker image
	@docker build -t $(SVC):$(VERSION) .

docker-compose co:
	@echo [Docker][Compose] Running with docker compose
	@docker-compose build
	@docker-compose up

deploy d:
	@echo "[App Engine Deployment] Deploying App"
	@gcloud app deploy

run r:
	@echo "[Running] Running service with $(ENV)"
	@PORT=$(PORT) MONGO_URI="$(MONGO_URI)" HISTORY_URL="$(HISTORY_URL)" DEVICE_CONTROL_URL="$(DEVICE_CONTROL_URL)" JWT_KEY="$(JWT_KEY)" GOOGLE_CLIENT_SECRET="$(GOOGLE_CLIENT_SECRET)" npm start

.PHONY: version v init i deploy d run r