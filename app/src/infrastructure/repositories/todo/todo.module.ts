import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormConfigModule } from "../../config/typeorm/typeorm.module";
import { Todo } from "../../entities/todo.entity";
import { DatabaseTodoRepository } from "./todo.repository";

@Module({
	imports: [TypeormConfigModule, TypeOrmModule.forFeature([Todo])],
	providers: [DatabaseTodoRepository],
	exports: [DatabaseTodoRepository],
})
export class TodoRepositoryModule {}
