# Nestjs Mysql

This project aims to learn Clean architecture in NestJS using Mysql and typeorm.

## Features

- Sign up
- Sign in
- Log out
- Refresh tokens
- List, update and delete users
- CRUD todo by logged in user

## How to use?

- Copy .env.template to .env `cp .env.template .env`
- Populates the `.env` file with values

DB_ROOT_PASSWORD=(Default: root)

DB_PORT=(Default: 3306)

DB_HOST=(Default: db)

DB_USER=(Default: root)

DB_PASSWORD=(Default: root)

DB_NAME=(Default: app)

JWT_SECRET=(Write your own secret)

JWT_REFRESH_SECRET=(Write your own secret)

APP_LOCAL_PORT=(Default: 3000)

APP_DOCKER_PORT=(Default: 3000)
