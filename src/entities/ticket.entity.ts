import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./movie.entity";
import { User } from "./user.entity";

@Index("fk_ticket_movie_id", ["movieId"], {})
@Index("fk_ticket_user_id", ["userId"], {})
@Entity("ticket", { schema: "aplikacija" })
export class Ticket {
  @PrimaryGeneratedColumn({ type: "int", name: "ticket_id", unsigned: true })
  ticketId: number;

  @Column("int", { name: "seats", unsigned: true, default: () => "'0'" })
  seats: number;

  @Column("varchar", { name: "date", length: 32, default: () => "'0'" })
  date: string;

  @Column("varchar", { name: "time", length: 32, default: () => "'0'" })
  time: string;

  @Column("int", { name: "movie_id", unsigned: true, default: () => "'0'" })
  movieId: number;

  @Column("int", { name: "user_id", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("int", { name: "screening_room", unsigned: true, default: () => "'0'" })
  screeningRoom: number;
 
  @ManyToOne(() => Movie, (movie) => movie.tickets, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @ManyToOne(() => User, (user) => user.tickets, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
