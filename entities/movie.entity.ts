import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ticket } from "./ticket.entity";

@Index("uq_movie_title", ["title"], { unique: true })
@Index("uq_movie_image_url", ["imageUrl"], { unique: true })
@Entity("movie", { schema: "aplikacija" })
export class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column("varchar", {
    name: "title",
    unique: true,
    length: 64,
    default: () => "'0'",
  })
  title: string;

  @Column("varchar", { name: "genre", length: 64, default: () => "'0'" })
  genre: string;

  @Column("int", { name: "duration", default: () => "'0'" })
  duration: number;

  @Column("varchar", {
    name: "image_url",
    unique: true,
    length: 128,
    default: () => "'0'",
  })
  imageUrl: string;

  @Column("varchar", { name: "director", length: 64, default: () => "'0'" })
  director: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("tinyint", { name: "rating", default: () => "'0'" })
  rating: number;

  @OneToMany(() => Ticket, (ticket) => ticket.movie)
  tickets: Ticket[];
}
