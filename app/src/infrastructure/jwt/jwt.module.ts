import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./accessToken.strategy";
import { RefreshTokenStrategy } from "./refreshToken.strategy";

@Module({
	imports: [JwtModule.register({})],
	providers: [AccessTokenStrategy, RefreshTokenStrategy],
	exports: [AccessTokenStrategy, RefreshTokenStrategy],
})
export class JwtAuthModule {}
