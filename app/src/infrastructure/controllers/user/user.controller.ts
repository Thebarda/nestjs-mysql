import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { UseCaseProxy } from "src/usecases/usecases-proxy";
import type { UserDeleteUseCase } from "src/usecases/user/delete.usecase";
import type { UserFindAllUseCase } from "src/usecases/user/findAll.usecase";
import type { UserFindByIdUseCase } from "src/usecases/user/findById.usecase";
import type { UserInsertUseCase } from "src/usecases/user/insert.usercase";
import type { UserUpdateUseCase } from "src/usecases/user/update.usecase";
import { UserUseCasesModule } from "src/usecases/user/user.usecase";
import { withBaseResponse } from "../Base.presenter";
import { AddUserDto, UpdateUserDto } from "./user.dto";
import { UserPresenter } from "./user.presenter";

@Controller("user")
@ApiTags("user")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UserUseCasesModule.GET_ALL_USERS)
    private readonly findAllUserUseCase: UseCaseProxy<UserFindAllUseCase>,
    @Inject(UserUseCasesModule.GET_USER_BY_ID)
    private readonly findUserByIdUseCase: UseCaseProxy<UserFindByIdUseCase>,
    @Inject(UserUseCasesModule.INSERT_USER)
    private readonly insertUserUseCase: UseCaseProxy<UserInsertUseCase>,
    @Inject(UserUseCasesModule.UPDATE_USER)
    private readonly updateUserUseCase: UseCaseProxy<UserUpdateUseCase>,
    @Inject(UserUseCasesModule.DELETE_USER)
    private readonly deleteUserUseCase: UseCaseProxy<UserDeleteUseCase>,
  ) {}

  @Get("users")
  @ApiResponse({
    type: withBaseResponse(UserPresenter, true),
  })
  async findAllUsers() {
    const users = await this.findAllUserUseCase.getInstance().execute();

    return users.map((user) => new UserPresenter(user));
  }

  @Get("user/:id")
  @ApiResponse({
    type: withBaseResponse(UserPresenter),
  })
  async findUserById(@Param("id") id: number) {
    const user = await this.findUserByIdUseCase.getInstance().execute(id);

    return user && new UserPresenter(user);
  }

  @Post("user")
  @ApiBody({
    type: AddUserDto,
  })
  async insertUser(@Body() addUserDto: AddUserDto) {
    await this.insertUserUseCase.getInstance().execute(addUserDto);
    return "success";
  }

  @Patch("user/:id")
  @ApiBody({
    type: UpdateUserDto,
  })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param("id") id: number,
  ) {
    await this.updateUserUseCase.getInstance().execute(id, updateUserDto);
    return "success";
  }

  @Delete("user/:id")
  async deleteUser(@Param("id") id: number) {
    await this.deleteUserUseCase.getInstance().execute(id);
    return "success";
  }
}
