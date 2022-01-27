build-server:
	docker-compose build

init-server:
	docker-compose up

import-data:
	docker exec wm-challenge-mongo bash -c './database/import.sh localhost'

run-tests:
	docker-compose run --rm node npx jest

down-server:
	docker rm -f wm-challenge-node wm-challenge-mongo

reinstall-server:
	make down-server
	make build-server
	make import-data
	make init-server