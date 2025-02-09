install-deps:
	cd app && pnpm i --frozen-lockfile

install:
	$(install-deps)
	mkdir db
	docker compose build

start:
	docker compose up -d

down:
	docker compose down

bash-db:
	docker exec -ti mysql-db bash

bash-app:
	docker exec -ti nestjs-app bash

cleanup-db:
	sudo rm -rf ./db
