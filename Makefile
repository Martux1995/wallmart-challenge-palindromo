init-service:
	docker-compose up

init-service-bg:
	docker-compose up -d

run-tests:
	docker-compose run --rm node npx jest

down-service:
	docker rm -f wm-challenge-node wm-challenge-mongo wm-challenge-app wm-challenge-mongo-populate
	docker rmi wallmart-challenge-palindromo_front wallmart-challenge-palindromo_node wallmart-challenge-palindromo_populate_mongo

reinstall-service:
	make down-service
	make init-service