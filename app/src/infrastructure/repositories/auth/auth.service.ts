import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import type { UserModel } from "src/domain/model/user";
import type { AuthRepositoryModel } from "src/domain/repositories/auth.interface";

@Injectable()
export class AuthRepositoryService implements AuthRepositoryModel {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  async hashData(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  async compare(plainText: string, hashed: string): Promise<boolean> {
    return await argon2.verify(hashed, plainText);
  }

  async getTokens(
    user: Pick<UserModel, "id" | "mail" | "username">,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user.id,
          mail: user.mail,
          username: user.username,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: "15m",
        },
      ),
      this.jwtService.signAsync(
        {
          id: user.id,
          mail: user.mail,
          username: user.username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: "7d",
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
