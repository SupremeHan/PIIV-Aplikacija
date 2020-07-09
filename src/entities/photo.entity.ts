import { Column, Entity, Index, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Movie } from "./movie.entity";

@Index("uq_photo_image_path", ["imagePath"], { unique: true })
@Index("fk_photo_movie_id", ["movieId"], {})
@Entity("photo", { schema: "aplikacija" })
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column("int", { name: "movie_id", unsigned: true, default: () => "'0'" })
  movieId: number;

  @Column("varchar", {
    name: "image_path",
    unique: true,
    length: 128,
    default: () => "'0'",
  })
  imagePath: string;

  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;
}
