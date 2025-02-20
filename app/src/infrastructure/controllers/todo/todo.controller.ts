import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import type { TodoDeleteUseCase } from "src/usecases/todo/delete.usecase";
import type { TodoFindAllUseCase } from "src/usecases/todo/findAll.usecase";
import type { TodoFindByContentUseCase } from "src/usecases/todo/findByContent.usecase";
import type { TodoFindByIdUseCase } from "src/usecases/todo/findById.usecase";
import type { TodoInsertUseCase } from "src/usecases/todo/insertTodo.usecase";
import { TodoUseCasesModule } from "src/usecases/todo/todo.usecase";
import type { TodoUpdateUseCase } from "src/usecases/todo/update.usecase";
import type { UseCaseProxy } from "src/usecases/usecases-proxy";
import { withBaseResponse } from "../Base.presenter";
import { AddTodoDto, UpdateTodoDto } from "./todo.dto";
import { TodoPresenter } from "./todo.presenter";

@Controller("todo")
@ApiTags("todo")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(TodoPresenter)
export class TodoController {
  constructor(
    @Inject(TodoUseCasesModule.GET_ALL_TODOS)
    private readonly findAllTodoUseCase: UseCaseProxy<TodoFindAllUseCase>,
    @Inject(TodoUseCasesModule.GET_TODO_BY_ID)
    private readonly findTodoByIdUseCase: UseCaseProxy<TodoFindByIdUseCase>,
    @Inject(TodoUseCasesModule.GET_TODOS_BY_CONTENT)
    private readonly findTodosByContentUseCase: UseCaseProxy<TodoFindByContentUseCase>,
    @Inject(TodoUseCasesModule.INSERT_TODO)
    private readonly insertTodoUseCase: UseCaseProxy<TodoInsertUseCase>,
    @Inject(TodoUseCasesModule.UPDATE_TODO)
    private readonly updateTodoUseCase: UseCaseProxy<TodoUpdateUseCase>,
    @Inject(TodoUseCasesModule.DELETE_TODO)
    private readonly deleteTodoUseCase: UseCaseProxy<TodoDeleteUseCase>,
  ) {}

  @Get("todos")
  @ApiResponse({
    type: withBaseResponse(TodoPresenter, true),
  })
  async findAllTodos() {
    const todos = await this.findAllTodoUseCase.getInstance().execute();

    return todos.map((todo) => new TodoPresenter(todo));
  }

  @Get("todo/:id")
  @ApiResponse({
    type: withBaseResponse(TodoPresenter),
  })
  async findById(@Param("id") id: number) {
    const todo = await this.findTodoByIdUseCase.getInstance().execute(id);

    return todo ? new TodoPresenter(todo) : todo;
  }

  @Get("todo")
  @ApiResponse({
    isArray: true,
    type: withBaseResponse(TodoPresenter, true),
  })
  async findByContent(@Query("search") search: string) {
    const todos = await this.findTodosByContentUseCase
      .getInstance()
      .execute(search);

    return todos.map((todo) => new TodoPresenter(todo));
  }

  @Post("todo")
  @ApiBody({
    type: AddTodoDto,
  })
  async insertTodo(@Body() addTodoDto: AddTodoDto) {
    await this.insertTodoUseCase.getInstance().execute(addTodoDto);
    return "success";
  }

  @Patch("todo/:id")
  @ApiBody({
    type: UpdateTodoDto,
  })
  async updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param("id") id: number,
  ) {
    await this.updateTodoUseCase.getInstance().execute(id, updateTodoDto);
    return "success";
  }

  @Delete("todo/:id")
  async deleteTodo(@Param("id") id: number) {
    await this.deleteTodoUseCase.getInstance().execute(id);
    return "success";
  }
}
