import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ShowTime } from "./show-time.entity";

@Index("uq_movie_title", ["title"], { unique: true })
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

  @Column("varchar", { name: "image_url", length: 128, default: () => "'0'" })
  imageUrl: string;

  @Column("varchar", { name: "director", length: 64, default: () => "'0'" })
  director: string;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;

  @Column("tinyint", { name: "rating", default: () => "'0'" })
  rating: number;

  @OneToMany(() => ShowTime, (showTime) => showTime.movie)
  showTimes: ShowTime[];
}
