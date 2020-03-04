VERSION := $$(cat package.json | grep version | sed 's/"/ /g' | awk {'print $$3'})

PROD := env.json
DEV := env-dev.json
ENV := $(DEV)

JWT_KEY := $$(cat $(ENV) | grep JWT_KEY | sed 's/"/ /g' | awk {'print $$3'})
HISTORY_URL := $$(cat $(ENV) | grep HISTORY_URL | sed 's/"/ /g' | awk {'print $$3'})
DEVICE_CONTROL_URL := $$(cat $(ENV) | grep DEVICE_CONTROL_URL | sed 's/"/ /g' | awk {'print $$3'})
MAILER_URL := $$(cat $(ENV) | grep MAILER_URL | sed 's/"/ /g' | awk {'print $$3'})
USER_URL := $$(cat $(ENV) | grep USER_URL | sed 's/"/ /g' | awk {'print $$3'})
GOOGLE_CLIENT_SECRET := $$(cat $(ENV) | grep GOOGLE_CLIENT_SECRET | sed 's/"/ /g' | awk {'print $$3'})
projectId := $$(cat $(ENV) | grep projectId | sed 's/"/ /g' | awk {'print $$3'})

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

deploy-test dt:
	@echo "[TESTING] [App Engine Deployment] Deploying App"
	@gcloud app deploy app-testing.yaml

deploy-features df:
	@echo "[NEW FEATURES] [App Engine Deployment] Deploying App"
	@gcloud app deploy app-features.yaml

run r:
	@echo "[Running] Running service with $(ENV)"
	@PORT=$(PORT) GOOGLE_APPLICATION_CREDENTIALS="./google-cloud-service-account.json" JWT_KEY="$(JWT_KEY)" projectId="$(projectId)" GOOGLE_CLIENT_SECRET="$(GOOGLE_CLIENT_SECRET)" MAILER_URL="$(MAILER_URL)" HISTORY_URL="$(HISTORY_URL)" DEVICE_CONTROL_URL="$(DEVICE_CONTROL_URL)" USER_URL="$(USER_URL)" GOOGLE_CLIENT_ID="$(GOOGLE_CLIENT_ID)" node src/index.js

.PHONY: version v init i deploy d run r