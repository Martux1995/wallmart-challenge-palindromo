# build-server:
# 	docker-compose build

init-server:
	docker-compose up --build

import-data:
	docker exec wm-challenge-mongo bash -c './database/import.sh localhost'

run-tests:
	docker-compose run --rm node npx jest

down-server:
	docker rm -f wm-challenge-node wm-challenge-mongo wm-challenge-app

reinstall-server:
	make down-server
# make build-server
	make init-server
	make import-data