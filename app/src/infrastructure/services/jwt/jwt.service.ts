import { Injectable } from "@nestjs/common";
import type { JwtService as Jwt } from "@nestjs/jwt";

@Injectable()
export class JwtService {
	constructor(private jwtService: Jwt) {}

	async signIn(mail: string, password: string) {
		return await this.jwtService.signAsync({ mail, password });
	}

	verify(password: string) {
		return this.jwtService.verify(password);
	}
}
