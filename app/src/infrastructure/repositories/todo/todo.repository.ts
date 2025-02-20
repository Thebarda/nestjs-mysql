import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoModel } from "src/domain/model/todo";
import type { TodoRepository } from "src/domain/repositories/todo.interface";
import { Todo } from "src/infrastructure/entities/todo.entity";
import type { Repository } from "typeorm";

@Injectable()
export class DatabaseTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoEntityRepository: Repository<Todo>,
  ) {}

  async insert(todo: Pick<TodoModel, "content" | "isDone">): Promise<void> {
    await this.todoEntityRepository
      .createQueryBuilder()
      .insert()
      .into(Todo)
      .values({
        isDone: todo.isDone,
        content: todo.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        creator: { id: 2, mail: "user@mail.fr", username: "user" },
      })
      .execute();
  }

  async findAll(): Promise<Array<TodoModel>> {
    const todosEntity = await this.todoEntityRepository
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.creator", "user")
      .getMany();
    const todos = todosEntity.map((todoEntity) => this.toTodo(todoEntity));
    return todos;
  }

  async findById(id: number): Promise<TodoModel | null> {
    const todoEntity = await this.todoEntityRepository
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.creator", "user")
      .where("todo.id = :id", { id })
      .getOne();
    if (!todoEntity) {
      return null;
    }
    return this.toTodo(todoEntity);
  }

  async findByContent(search: string): Promise<Array<TodoModel>> {
    const todoEntities = await this.todoEntityRepository
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.creator", "user")
      .where("todo.content LIKE :search", { search: `%${search}%` })
      .getMany();
    const todos = todoEntities.map((todoEntity) => this.toTodo(todoEntity));
    return todos;
  }

  async deleteById(id: number): Promise<void> {
    await this.todoEntityRepository
      .createQueryBuilder("todo")
      .delete()
      .where("todo.id = :id", { id })
      .execute();
  }

  async updateTodo(
    id: number,
    todo: Pick<TodoModel, "content" | "isDone" | "creator">,
  ): Promise<void> {
    await this.todoEntityRepository
      .createQueryBuilder("todo")
      .update()
      .set({
        content: todo.content,
        isDone: todo.isDone,
        creator: todo.creator,
      })
      .where("todo.id = :id", { id })
      .execute();
  }

  private toTodo(todoEntity: Todo): TodoModel {
    const todo: TodoModel = new TodoModel();

    todo.id = todoEntity.id;
    todo.content = todoEntity.content;
    todo.isDone = todoEntity.isDone;
    todo.createdAt = todoEntity.createdAt;
    todo.updatedAt = todoEntity.updatedAt;
    todo.creator = todoEntity.creator;
    return todo;
  }
}
