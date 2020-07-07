import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Movie } from "src/entities/movie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddMovieDto } from "src/dto/movie/add.movie.dto";
import { ApiResponse } from "src/misc/api.response";
import { resolve } from "dns";
import { EditMovieDto } from "src/dto/movie/edit.movie.dto";
import { SearchMovieDto } from "src/dto/movie/search.movie.dto";
import { Photo } from 'src/entities/photo.entity';

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
    constructor(@InjectRepository(Movie) private readonly movie: Repository<Movie>) {
        super(movie);
    }

    async getAll(): Promise<Movie[]> {
        let x = await this.movie.find();
        const builder = this.photo.createQueryBuilder("photo");

        x.forEach(element => {
            console.log(element);
            

            builder.where('movie.genre = :genre', {genre: data.genre});
        });
        return x;
    }

    getById(id: number): Promise<Movie> {
        return this.movie.findOne(id);
    }

    async editMovie(id: number, data: EditMovieDto): Promise<Movie | ApiResponse> {
        let movie: Movie = await this.movie.findOne(id);

        movie.title = data.title;
        movie.genre = data.genre;
        movie.duration = data.duration;
        movie.director = data.director;
        movie.description = data.description;

        return this.movie.save(movie);
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

    async search(data: SearchMovieDto): Promise<Movie[] | ApiResponse> {
        const builder = await this.movie.createQueryBuilder("movie");

        builder.where('movie.genre = :genre', {genre: data.genre});
        
        let articles = await builder.getMany();

        if (articles.length === 0) {
            return new ApiResponse("ok", 0, "No articles found for these search parameters.");
        }

        return articles;
    }
}