import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { JWTPayload } from "src/domain/model/jwt";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				AccessTokenStrategy.extractJWT,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			secretOrKey: process.env.JWT_SECRET as string,
		});
	}

	private static extractJWT(request: Request): string | null {
		return request.cookies?.access_token || null;
	}

	validate(payload: JWTPayload) {
		return payload;
	}
}
