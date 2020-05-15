import { Controller, Get, Param, Post, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
import { Movie } from "src/entities/movie.entity";
import { MovieService } from "src/services/movie/movie.service";
import { ApiResponse } from "src/misc/api.response";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StorageConfig } from "config/storage config";
import { PhotoService } from "src/services/photo/photo.service";
import { Photo } from "src/entities/photo.entity";

@Controller('api/movie')
export class MovieController {
    constructor(public movieService: MovieService,
                public photoService: PhotoService) {}

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

    @Post(':id/uploadPhoto/')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: StorageConfig.photoDestination,
                filename: (req, file, callback) => {
                    let original = file.originalname;

                    let normalized = original.replace(/\s/g, '-');
                    normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
                    let sada = new Date();
                    let datePart = '';
                    datePart += sada.getFullYear().toString();
                    datePart += (sada.getMonth() + 1).toString();
                    datePart += sada.getDate().toString();

                     
                    let randomPart: string = 
                    new Array(10).fill(0).map(e => (Math.random()* 9).toFixed(0).toString())
                    .join('');

                    let fileName = datePart + '-' + randomPart + '-' + normalized;
                    fileName = fileName.toLocaleLowerCase();

                    callback(null, fileName);
                }
            }),
            fileFilter: (req, file, callback) => {
                if(!file.originalname.match(/\.(jpg|png)$/)) {
                    req.fileFilterError = 'Bad file extension!';
                    callback(null, false);
                    return;
                }

                if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                    req.fileFilterError = 'Bad file content!';
                    callback(null, false);
                    return;
                }

                callback(null, true);
            },
            limits: {
                files: 1,
                fileSize: StorageConfig.photoMaxFileSize,
            },
        })
    )
    async uploadPhoto(
        @Param('id') movieId: number, 
        @UploadedFile() photo, 
        @Req() req): Promise<Photo | ApiResponse> {

        if(req.fileFilterError) {
            return new ApiResponse("error", -4002, req.fileFilterError);
        }

        if(!photo) {
            return new ApiResponse("error", -4002, 'File not uploaded!');
        }
        
        const newPhoto: Photo = new Photo();
        newPhoto.movieId  = movieId;
        newPhoto.imagePath = photo.filename;

        const savedPhoto = await this.photoService.add(newPhoto);
        if(!savedPhoto) {
            return new ApiResponse("error", -4001);
        }

        return savedPhoto;
    }
}