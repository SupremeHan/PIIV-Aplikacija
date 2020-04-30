import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ticket } from "./ticket.entity";

@Index("uq_user_email", ["email"], { unique: true })
@Index("uq_user_phone_number", ["phoneNumber"], { unique: true })
@Entity("user", { schema: "aplikacija" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 255,
    default: () => "'0'",
  })
  email: string;

  @Column("varchar", {
    name: "password_hash",
    length: 128,
    default: () => "'0'",
  })
  passwordHash: string;

  @Column("varchar", { name: "forname", length: 64, default: () => "'0'" })
  forname: string;

  @Column("varchar", { name: "surname", length: 64, default: () => "'0'" })
  surname: string;

  @Column("varchar", {
    name: "phone_number",
    unique: true,
    length: 24,
    default: () => "'0'",
  })
  phoneNumber: string;

  @Column("text", { name: "adress" })
  adress: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
