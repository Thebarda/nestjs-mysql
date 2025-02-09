import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn({ type: "integer" })
	id: number;

	@Column("varchar", { length: 255, nullable: false })
	mail: string;

	@Column("varchar", { length: 255, nullable: false })
	password: string;

	@OneToMany(
		() => Todo,
		(todo) => todo.creator,
	)
	todos: Array<Todo>;
}
