import {
	type CanActivate,
	type ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { LoggerService } from "../logger/logger.service";


@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject(JwtService)
		private jwtService: JwtService,
		@Inject(Reflector)
		private reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}

		try {
			const payload = await this.jwtService.verify(token);
			new LoggerService().log("guard", JSON.stringify(payload))
			// 💡 We're assigning the payload to the request object here
			// so that we can access it in our route handlers
			request["user"] = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
