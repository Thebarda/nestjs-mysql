import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column("varchar", { length: 255, nullable: false })
  content: string;

  @Column("boolean", { default: false, nullable: false })
  isDone: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    (user) => user.todos,
  )
  @JoinColumn({ name: "creatorId", referencedColumnName: "id" })
  creator: User;
}
