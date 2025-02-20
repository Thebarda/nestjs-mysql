import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { JWTPayload } from "src/domain/model/jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				RefreshTokenStrategy.extractJWT,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			secretOrKey: process.env.JWT_REFRESH_SECRET as string,
			passReqToCallback: true,
		});
	}

	private static extractJWT(request: Request): string | null {
		return request.cookies?.refresh_token || null;
	}

	validate(request: Request, payload: JWTPayload) {
		const refreshToken = RefreshTokenStrategy.extractJWT(request);
		return { ...payload, refreshToken };
	}
}
