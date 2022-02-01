init-service:
	docker-compose up

init-service-bg:
	docker-compose up -d

run-tests:
	docker-compose run --rm node npx jest

stop-service:
	docker-compose stop

down-service:
	docker-compose down
	docker rmi $(docker images wallmart-challenge-palindromo* -q)