import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import type { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements NestInterceptor {
	constructor(private readonly jwt: JwtService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest();

		const token =
			this.extractTokenFromCookies(request) ||
			this.extractTokenFromHeader(request);

		if (!token) {
			return next.handle();
		}

		try {
			const user = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
			request.user = user;

			return next.handle();
		} catch (_) {
			return next.handle();
		}
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}

	private extractTokenFromCookies(request: Request): string | undefined {
		if (request.cookies.accessToken === "undefined") {
			return undefined;
		}

		return request.cookies.accessToken;
	}
}
