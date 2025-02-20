import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	type Relation,
} from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn({ type: "integer" })
	id: number;

	@Column("varchar", { length: 255, nullable: false })
	mail: string;

	@Column("varchar", { length: 255, nullable: false })
	username: string;

	@Column("varchar", { length: 255, nullable: false })
	password: string;

	@Column("varchar", { length: 355, nullable: true, default: null })
	refreshToken: string | null;

	@OneToMany(
		() => Todo,
		(todo) => todo.creator,
		{ cascade: true },
	)
	@JoinColumn({ name: "id", referencedColumnName: "creatorId" })
	todos: Array<Relation<Todo>>;
}
