import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { Public } from "src/infrastructure/decorators/public.decorator";
import type { UseCaseProxy } from "src/usecases/usecases-proxy";
import type { SignUpUseCase } from "src/usecases/user/signUp.usecase";
import { UserUseCasesModule } from "src/usecases/user/user.usecases";
import type { SignUpDto } from "./auth.dto";
import { AuthPresenter } from "./auth.presenter";

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AuthPresenter)
export class AuthController {
	constructor(
		@Inject(UserUseCasesModule.SIGN_UP_USER_USECASE)
		private readonly signUpUseCaseProxy: UseCaseProxy<SignUpUseCase>
	) {}

	@Public()
	@Post('sign-up')
  @ApiResponseType(AuthPresenter, true)
  async signUp(@Body() signUpBody: SignUpDto) {
    const { mail, password } = signUpBody;
    const response = await this.signUpUseCaseProxy.getInstance().execute(mail, password);
    return response;
  }
}
