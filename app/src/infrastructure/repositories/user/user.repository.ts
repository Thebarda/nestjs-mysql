import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcryptjs";
import { UserM } from "src/domain/model/user";
import type { UserRepository } from "src/domain/repositories/userRepository.interface";
import { User } from "src/infrastructure/entities/user.entity";
import type { Repository } from "typeorm";

@Injectable()
export class DatabaseUserRepository implements UserRepository {
	constructor(
		@InjectRepository(User)
		private readonly userEntityRepository: Repository<User>,
	) {}

	async insert(user: UserM): Promise<UserM> {
	  const userEntity = this.toUserEntity(user);
		const result = await this.userEntityRepository.insert(userEntity);
		user.id = result.raw.insertId;
		return user
	}


	async findById(mail: string): Promise<UserM | null> {
		const userEntity = await this.userEntityRepository.findOne({
			where: {
				mail
			}
		});
		if (!userEntity) {
			return null
		}
		return this.toUser(userEntity);
	}

	async encryptPassword(password: string): Promise<string> {
		const promise = new Promise<string>((resolve, reject) => {
			return bcrypt.hash(password, 8, (error, hash) => {
				if (error) {
					reject(error);
				}
				resolve(hash)
			})
		})

		return await promise;
	}

	private toUser(userEntity: User): UserM {
    const user: UserM = new UserM();

    user.id = userEntity.id;
    user.mail = userEntity.mail;
    user.password = userEntity.password;

    return user;
  }


	private toUserEntity(user: UserM): User {
    const userEntity: User = new User();

    userEntity.id = user.id;
    userEntity.mail = user.mail;
    userEntity.password = user.password;

    return userEntity;
  }
}
