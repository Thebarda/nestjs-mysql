import type { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
	type: "mysql",
	host: process.env.DATABASE_HOST,
	port: Number.parseInt(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [__dirname + "./../../**/*.entity{.ts,.js}"],
	synchronize: false,
};

export default config;
