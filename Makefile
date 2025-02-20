install-deps:
	cd app && pnpm i --frozen-lockfile

install:
	$(install-deps)
	mkdir db
	docker compose build

start:
	docker compose up -d
	docker compose exec app bash -c "pnpm i --frozen-lockfile"

down:
	docker compose down

bash-db:
	docker exec -ti db bash

bash-app:
	docker exec -ti app bash

cleanup-db:
	sudo rm -rf ./db

restart: down start

reboot: down cleanup-db docker-build start

docker-build:
	docker compose build
