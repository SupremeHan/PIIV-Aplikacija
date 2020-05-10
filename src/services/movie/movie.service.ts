import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Movie } from "src/entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddMovieDto } from "src/dto/movie/add.movie.dto";
import { ApiResponse } from "src/misc/api.response";
import { resolve } from "dns";

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
    constructor(@InjectRepository(Movie) private readonly movie: Repository<Movie>) {
        super(movie);
    }

    getAll(): Promise<Movie[]> {
        return this.movie.find();
    }

    getById(id: number): Promise<Movie> {
        return this.movie.findOne(id);
    }

    async createFullMovie(data: AddMovieDto): Promise<Movie | ApiResponse> {
        let newMovie: Movie = new Movie();
        newMovie.title = data.title;
        newMovie.genre = data.genre;
        newMovie.duration = data.duration;
        newMovie.director = data.director;
        newMovie.description = data.description;

        return new Promise((resolve) => {
            this.movie.save(newMovie)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error",-5001);
                resolve(response);
            })
        })
    }
}