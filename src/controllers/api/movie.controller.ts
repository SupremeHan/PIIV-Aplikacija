import { Controller, Get, Param } from "@nestjs/common";
import { Movie } from "src/entities/movie.entity";
import { MovieService } from "src/services/movie/movie.service";
import { ApiResponse } from "src/misc/api.response";
import { async } from "rxjs/internal/scheduler/async";
import { resolve } from "dns";

@Controller('api/movie')
export class MovieController {
    constructor(public movieService: MovieService) {}

    @Get()
    getAll(): Promise<Movie[]> {
        return this.movieService.getAll();
    }

    @Get(':id')
    getById(@Param('id') movieId: number): Promise<Movie | ApiResponse> {
        return new Promise(async (resolve) => {
            let movie = await this.movieService.getById(movieId);
            if(movie == undefined) {
                resolve(new ApiResponse("error", -5002));
            }
            resolve(movie);
        })
    }
}