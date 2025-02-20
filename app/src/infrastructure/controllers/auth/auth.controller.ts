import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import type { UserModel } from "src/domain/model/user";
import { Public } from "src/infrastructure/decorators/public.decorator";
import { AuthUsecasesModule } from "src/usecases/auth/auth.usecases";
import type { AuthLogoutUseCase } from "src/usecases/auth/logout.usecase";
import type { AuthSignInUseCase } from "src/usecases/auth/signIn.usecase";
import type { AuthSignUpUseCase } from "src/usecases/auth/signUp.usecase";
import type { UseCaseProxy } from "src/usecases/usecases-proxy";
import { SignInDto, SignUpDto } from "./auth.dto";
import { TokensPresenter } from "./auth.presenter";

@Controller("auth")
@ApiTags("auth")
@ApiResponse({ status: 500, description: "Internal error" })
@ApiResponse({ status: 400, description: "Bad request" })
export class AuthController {
  constructor(
    @Inject(AuthUsecasesModule.SIGN_UP)
    private readonly signUpUseCase: UseCaseProxy<AuthSignUpUseCase>,
    @Inject(AuthUsecasesModule.SIGN_IN)
    private readonly signInUseCase: UseCaseProxy<AuthSignInUseCase>,
    @Inject(AuthUsecasesModule.LOGOUT)
    private readonly logoutUseCase: UseCaseProxy<AuthLogoutUseCase>,
  ) {}

  @Post("sign-up")
  @ApiBody({
    type: SignUpDto,
  })
  @ApiResponse({
    type: TokensPresenter,
  })
  @Public()
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.signUpUseCase.getInstance().execute(signUpDto);

    response.cookie("accessToken", tokens.accessToken);
    response.cookie("refreshToken", tokens.refreshToken);

    return tokens;
  }

  @Post("sign-in")
  @ApiBody({
    type: SignInDto,
  })
  @ApiResponse({
    type: TokensPresenter,
  })
  @Public()
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.signInUseCase.getInstance().execute(signInDto);

    response.cookie("accessToken", tokens.accessToken);
    response.cookie("refreshToken", tokens.refreshToken);

    return tokens;
  }

  @Get("logout")
  async logout(
    @Req() request: Request & {
      user: Pick<UserModel, "id" | "mail" | "username">;
    },
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.logoutUseCase.getInstance().execute(request.user.id);

    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");

    return "success";
  }
}
