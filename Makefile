build-service:
	docker-compose build

init-service:
	docker-compose up

init-service-bg:
	docker-compose up -d

fix-db-import-file:
	sed -i -e 's/\r$//' ./database/import.sh

import-data:
	docker exec wm-challenge-mongo bash -c './database/import.sh localhost'

run-tests:
	docker-compose run --rm node npx jest

down-service:
	docker rm -f wm-challenge-node wm-challenge-mongo wm-challenge-app
	docker rmi wallmart-challenge-palindromo_front
	docker rmi wallmart-challenge-palindromo_node

reinstall-service:
	make down-server
	make init-server
	make import-data