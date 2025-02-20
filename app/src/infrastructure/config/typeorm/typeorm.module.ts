import { Module } from "@nestjs/common";
import { TypeOrmModule, type TypeOrmModuleOptions } from "@nestjs/typeorm";
import config from "./typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => config as TypeOrmModuleOptions,
    }),
  ],
})
export class TypeormConfigModule {}
