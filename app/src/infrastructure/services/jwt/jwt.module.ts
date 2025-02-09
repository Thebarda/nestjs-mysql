import { Global, Module } from "@nestjs/common";
import { JwtModule as Jwt } from "@nestjs/jwt";

@Global()
@Module({
	imports: [
		Jwt.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "24h" },
		}),
	],
	providers: [Jwt],
	exports: [Jwt],
})
export class JwtModule {}
