import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./movie.entity";
import { Ticket } from "./ticket.entity";

@Index("movie_id", ["movieId"], {})
@Entity("show_time", { schema: "aplikacija" })
export class ShowTime {
  @PrimaryGeneratedColumn({ type: "int", name: "show_time_id", unsigned: true })
  showTimeId: number;

  @Column("int", { name: "screening_room", default: () => "'0'" })
  screeningRoom: number;

  @Column("time", { name: "time", default: () => "'00:00:00'" })
  time: string;

  @Column("date", { name: "date_at" })
  dateAt: string;

  @Column("date", { name: "date_to" })
  dateTo: string;

  @Column("int", { name: "movie_id", unsigned: true, default: () => "'0'" })
  movieId: number;

  @ManyToOne(() => Movie, (movie) => movie.showTimes, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @OneToMany(() => Ticket, (ticket) => ticket.showTime)
  tickets: Ticket[];
}
