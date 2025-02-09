import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormConfigModule } from "../config/typeorm/typeorm.module";
import { Todo } from "../entities/todo.entity";
import { User } from "../entities/user.entity";
import { DatabaseTodoRepository } from "./todo/todo.repository";
import { DatabaseUserRepository } from "./user/user.repository";

@Module({
	imports: [TypeormConfigModule, TypeOrmModule.forFeature([Todo, User])],
	providers: [DatabaseTodoRepository, DatabaseUserRepository],
	exports: [DatabaseTodoRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
