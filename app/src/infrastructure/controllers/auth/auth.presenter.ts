import { ApiProperty } from "@nestjs/swagger";
import type { TokensModel } from "src/domain/model/tokens";

export class TokensPresenter {
	@ApiProperty()
	accessToken: string;
	@ApiProperty()
	refreshTokens: string;

	constructor(tokens: TokensModel) {
		this.accessToken = tokens.accessToken;
		this.refreshTokens = tokens.refreshToken;
	}
}
