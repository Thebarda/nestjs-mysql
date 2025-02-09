import { Module } from "@nestjs/common";
import { TypeOrmModule, type TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions =>
	({
		type: "mysql",
		host: process.env.DB_HOST,
		port: Number.parseInt(process.env.DB_PORT),
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		entities: [__dirname + "./../../**/*.entity{.ts,.js}"],
		synchronize: false,
	}) as TypeOrmModuleOptions;

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: getTypeOrmModuleOptions,
		}),
	],
})
export class TypeormConfigModule {}
