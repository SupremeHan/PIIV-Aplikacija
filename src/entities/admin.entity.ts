import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdminToken } from "./admin-token.entity";

@Index("uq_admin_username", ["username"], { unique: true })
@Entity("admin", { schema: "aplikacija" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "admin_id", unsigned: true })
  adminId: number;

  @Column("varchar", {
    name: "username",
    unique: true,
    length: 32,
    default: () => "'0'",
  })
  username: string;

  @Column("varchar", {
    name: "password_hash",
    length: 128,
    default: () => "'0'",
  })
  passwordHash: string;

  @OneToMany(() => AdminToken, (adminToken) => adminToken.admin)
  adminTokens: AdminToken[];
}
