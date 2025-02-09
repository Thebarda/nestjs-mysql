import { ApiProperty } from "@nestjs/swagger";

export class AuthPresenter {
	@ApiProperty()
	accessToken: string;

	constructor(accessToken: string) {
		this.accessToken = accessToken;
	}
}
