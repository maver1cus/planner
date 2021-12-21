build:
	docker-compose down -v
	docker-compose build

start:
	docker-compose down -v
	docker-compose up -d

stop:
	docker-compose down -v
