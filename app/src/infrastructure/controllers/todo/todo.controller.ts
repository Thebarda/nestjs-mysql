import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import type { deleteByIdUseCase } from "src/usecases/todo/deleteById.usecase";
import type { getTodoByIdUseCase } from "src/usecases/todo/getTodoById.usecase";
import type { getTodosUseCase } from "src/usecases/todo/getTodos.usecase";
import type { insertTodoUseCase } from "src/usecases/todo/insertTodo.usecase";
import { TodoUseCasesModule } from "src/usecases/todo/todo.usecases";
import type { updateContentUseCase } from "src/usecases/todo/updateContent.usecase";
import type { UseCaseProxy } from "src/usecases/usecases-proxy";
import type { AddTodoDto, UpdateTodoDto } from "./todo.dto";
import { TodoPresenter } from "./todo.presenter";

@Controller('todo')
@ApiTags('todo')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TodoPresenter)
export class TodoController {
  constructor(
    @Inject(TodoUseCasesModule.GET_TODO_USECASES_PROXY)
    private readonly getTodoUsecaseProxy: UseCaseProxy<getTodoByIdUseCase>,
    @Inject(TodoUseCasesModule.GET_TODOS_USECASES_PROXY)
    private readonly getAllTodoUsecaseProxy: UseCaseProxy<getTodosUseCase>,
    @Inject(TodoUseCasesModule.PUT_TODO_USECASES_PROXY)
    private readonly updateTodoUsecaseProxy: UseCaseProxy<updateContentUseCase>,
    @Inject(TodoUseCasesModule.DELETE_TODO_USECASES_PROXY)
    private readonly deleteTodoUsecaseProxy: UseCaseProxy<deleteByIdUseCase>,
    @Inject(TodoUseCasesModule.POST_TODO_USECASES_PROXY)
    private readonly addTodoUsecaseProxy: UseCaseProxy<insertTodoUseCase>,
  ) {}

  @Get('todo')
  @ApiResponseType(TodoPresenter, false)
  async getTodo(@Query('id', ParseIntPipe) id: number) {
    const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
    return new TodoPresenter(todo);
  }

  @Get('todos')
  @ApiResponseType(TodoPresenter, true)
  async getTodos() {
    const todos = await this.getAllTodoUsecaseProxy.getInstance().execute();
    return todos.map((todo) => new TodoPresenter(todo));
  }

  @Put('todo')
  @ApiResponseType(TodoPresenter, true)
  async updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
    const { id, isDone } = updateTodoDto;
    await this.updateTodoUsecaseProxy.getInstance().execute(id, isDone);
    return 'success';
  }

  @Delete('todo/:id')
  @ApiResponseType(TodoPresenter, true)
  async deleteTodo(@Param('id') id: number) {
    await this.deleteTodoUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('todo')
  @ApiResponseType(TodoPresenter, true)
  async addTodo(@Body() addTodoDto: AddTodoDto) {
    const { content } = addTodoDto;
    await this.addTodoUsecaseProxy.getInstance().execute(content);
    return 'success';
  }
}
