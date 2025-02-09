import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import type { Request } from "express"
import { TodoM } from "src/domain/model/todo";
import { UserM } from "src/domain/model/user";
import type { TodoRepository } from "src/domain/repositories/todoRepository.interface";
import { Todo } from "src/infrastructure/entities/todo.entity";
import type { Repository } from "typeorm";

@Injectable({ scope: Scope.REQUEST })
export class DatabaseTodoRepository implements TodoRepository {
    constructor(
    	@InjectRepository(Todo)
    	private readonly todoEntityRepository: Repository<Todo>,
        @Inject(REQUEST)
        private readonly request: Request,
    ) {}

    async insert(todo: TodoM): Promise<void> {
        await this.todoEntityRepository.createQueryBuilder().insert().into(Todo).values({
            isDone: todo.isDone,
            content: todo.content,
            createdAt: new Date(),
            updatedAt: new Date(),
            creator: this.request.user
        }).execute()
    }

    async findAll(): Promise<TodoM[]> {
        const todosEntity = await this.todoEntityRepository.createQueryBuilder("todo").leftJoinAndSelect("todo.creator", "user").where(
            "user.id = :id", { id: this.request.user.id }).getMany();
        const todos = todosEntity.map((todoEntity) => this.toTodo(todoEntity));
        return todos;
    }

    async findById(id: number): Promise<TodoM> {
        const todoEntity = await this.todoEntityRepository.createQueryBuilder("todo").leftJoinAndSelect("todo.creator", "user").where("todo.id = :id", {id}).getOneOrFail()
	return this.toTodo(todoEntity)
    }


    async deleteById(id: number): Promise<void> {
        const result = await this.todoEntityRepository.createQueryBuilder("todo").leftJoinAndSelect("todo.creator", "user").where("id = :id", { id }).andWhere("creatorId = :userId", { userId: this.request.user.id }).delete().execute()

        if (result.affected === 0) {
            throw new NotFoundException("todo not found")
        }
    }


    async updateContent(id: number, isDone: boolean): Promise<void> {
        const result = await this.todoEntityRepository.createQueryBuilder("todo").leftJoinAndSelect("todo.creator", "user").where("id = :id", { id }).andWhere("creatorId = :userId", { userId: this.request.user.id }).update().set({
            isDone
        }).execute()

        if (result.affected === 0) {
            throw new NotFoundException("todo not found")
        }
    }

    private toTodo(todoEntity: Todo): TodoM {
        const todo: TodoM = new TodoM();

        todo.id = todoEntity.id;
        todo.content = todoEntity.content;
        todo.isDone = todoEntity.isDone;
        todo.createdAt = todoEntity.createdAt;
        todo.updatedAt = todoEntity.updatedAt;
        todo.creator = {
            id: todoEntity.creator.id,
            mail: todoEntity.creator.mail
        };

        return todo;
    }

  private toTodoEntity(todo: TodoM): Todo {
    const todoEntity: Todo = new Todo();

    todoEntity.id = todo.id;
    todoEntity.content = todo.content;
    todoEntity.isDone = todo.isDone;
    todoEntity.createdAt = todo.createdAt;
    todoEntity.updatedAt = todo.updatedAt;
    todoEntity.creator = todo.creator;
   
    return todoEntity;
  }
}
