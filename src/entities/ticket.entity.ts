import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ShowTime } from "./show-time.entity";

@Index("fk_ticket_show_time_id", ["showTimeId"], {})
@Entity("ticket", { schema: "aplikacija" })
export class Ticket {
  @PrimaryGeneratedColumn({ type: "int", name: "ticket_id", unsigned: true })
  ticketId: number;

  @Column("int", { name: "seats", default: () => "'0'" })
  seats: number;

  @Column("varchar", { name: "forename", length: 64, default: () => "'0'" })
  forename: string;

  @Column("varchar", { name: "surname", length: 64, default: () => "'0'" })
  surname: string;

  @Column("varchar", { name: "phone", length: 64, default: () => "'0'" })
  phone: string;

  @Column("int", { name: "show_time_id", unsigned: true, default: () => "'0'" })
  showTimeId: number;

  @ManyToOne(() => ShowTime, (showTime) => showTime.tickets, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "show_time_id", referencedColumnName: "showTimeId" }])
  showTime: ShowTime;
}
