import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "src/domain/model/user";
import type { UserRepository } from "src/domain/repositories/user.interface";
import { User } from "src/infrastructure/entities/user.entity";
import type { Repository } from "typeorm";

@Injectable()
export class DatabaseUserService implements UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async insert(
    user: Pick<UserModel, "mail" | "password" | "username">,
  ): Promise<number> {
    const result = await this.userRepository
      .createQueryBuilder()
      .insert()
      .values({
        mail: user.mail,
        username: user.username,
        password: user.password,
      })
      .execute();

    return result.raw.insertId;
  }

  async findAll(): Promise<Array<UserModel>> {
    const usersEntity = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.todos", "todo")
      .getMany();

    return usersEntity.map(this.toUser);
  }

  async findById(id: number): Promise<UserModel | null> {
    const userEntity = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.todos", "todo")
      .where("user.id = :id", { id })
      .getOne();

    if (!userEntity) {
      return null;
    }

    return this.toUser(userEntity);
  }

  async findByUsername(username: string): Promise<UserModel | null> {
    const userEntity = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.todos", "todo")
      .where("user.username = :username", { username })
      .getOne();

    if (!userEntity) {
      return null;
    }

    return this.toUser(userEntity);
  }

  async update(
    id: number,
    user: Partial<
      Pick<UserModel, "mail" | "username" | "password" | "refreshToken">
    >,
  ): Promise<void> {
    await this.userRepository
      .createQueryBuilder("user")
      .update()
      .set({
        username: user.username,
        mail: user.mail,
        password: user.password,
        refreshToken: user.refreshToken,
      })
      .where("user.id = :id", { id })
      .execute();
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository
      .createQueryBuilder("user")
      .delete()
      .where("user.id = :id", { id })
      .execute();
  }

  private toUser(userEntity: User): UserModel {
    const user = new UserModel();

    user.username = userEntity.username;
    user.mail = userEntity.mail;
    user.id = userEntity.id;
    user.refreshToken = userEntity.refreshToken;
    user.password = userEntity.password;
    user.todos = userEntity.todos;

    return user;
  }
}
