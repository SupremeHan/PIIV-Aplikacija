import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "./admin.entity";

@Index("fk_admin_token_admin_id", ["adminId"], {})
@Entity("admin_token", { schema: "aplikacija" })
export class AdminToken {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "admin_token_id",
    unsigned: true,
  })
  adminTokenId: number;

  @Column("int", { name: "admin_id", unsigned: true })
  adminId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string;

  @Column("text", { name: "token" })
  token: string;

  @Column("datetime", { name: "expires_at" })
  expiresAt: string;

  @Column("tinyint", { name: "is_valid", width: 1, default: () => "'1'" })
  isValid: number;

  @ManyToOne(() => Admin, (admin) => admin.adminTokens, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "admin_id", referencedColumnName: "adminId" }])
  admin: Admin;
}
