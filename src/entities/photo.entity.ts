import { PrimaryGeneratedColumn, Column, Index, Entity, JoinColumn,
    ManyToOne, } from "typeorm";
import { Movie } from "./movie.entity";

@Index("fk_photo_movie_id", ["movieId"], {})
@Entity("photo", { schema: "aplikacija"})
export class Photo {
    @PrimaryGeneratedColumn({type: "int", name: "photo_id", unsigned: true})
    photoId: number;

    @Column({type: "int", name: "movie_id", unsigned: true })
    movieId: number;

    @Column({ type: "varchar",name: "image_path", unsigned: true })
    imagePath: string;

    @ManyToOne(() => Movie, (movie) => movie.photo, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      })
      @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
      movie: Movie;
}