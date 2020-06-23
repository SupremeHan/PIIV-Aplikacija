import { Controller, Get, Param, Post, UseInterceptors, UploadedFile, Req, Body, Patch } from "@nestjs/common";
import { Movie } from "src/entities/movie.entity";
import { MovieService } from "src/services/movie/movie.service";
import { ApiResponse } from "src/misc/api.response";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StorageConfig } from "config/storage config";
import { PhotoService } from "src/services/photo/photo.service";
import { Photo } from "src/entities/photo.entity";
import * as fileType from 'file-type';
import * as fs from 'fs'; 
import * as sharp from 'sharp';
import { AddMovieDto } from "src/dto/movie/add.movie.dto";
import { EditMovieDto } from "src/dto/movie/edit.movie.dto";
import { Crud } from "@nestjsx/crud";
import { SearchMovieDto } from "src/dto/movie/search.movie.dto";

@Controller('api/movie')
@Crud({
    model: {
        type: Movie
    },
    params: {
        id: {
            field: 'movieId',
            type: 'number',
            primary: true
        }
    }
})
export class MovieController {
    constructor(public service: MovieService,
                public photoService: PhotoService) {}

    @Get()
    getAll(): Promise<Movie[]> {
        return this.service.getAll();
    }

    @Get(':id')
    getById(@Param('id') movieId: number): Promise<Movie | ApiResponse> {
        return new Promise(async (resolve) => {
            let movie = await this.service.getById(movieId);
            if(movie == undefined) {
                resolve(new ApiResponse("error", -5002));
            }
            resolve(movie);
        })
    }
    
    
    @Post('createMovie')
    createMovie(@Body() data: AddMovieDto) {
        return this.service.createFullMovie(data);
    }

    @Patch(':id')
    edit(@Param('id') id:number, @Body() data: EditMovieDto): Promise<Movie | ApiResponse> {
        return this.service.editMovie(id, data);
    }

    @Post('search')
    async search(@Body() data: SearchMovieDto): Promise<Movie[]> {
        return await this.service.search(data);
    }

    @Post(':id/uploadPhoto/')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: StorageConfig.photo.destination,
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
                fileSize: StorageConfig.photo.maxSize,
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

        const fileTypeResult = await fileType.fromFile(photo.path);
        if(!fileTypeResult) {
            fs.unlinkSync(photo.path);

            return new ApiResponse("error", -4002, 'Cannot detect file type!');
        }

        const realMimeType = fileTypeResult.mime;
        if(!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
            fs.unlinkSync(photo.path);

            return new ApiResponse("error", -4002, 'Cannot detect file type!');
        }

        await this.createThumb(photo);
        await this.createSmallImage(photo);
        
        const newPhoto: Photo = new Photo();
        newPhoto.movieId  = movieId;
        newPhoto.imagePath = photo.filename;

        const savedPhoto = await this.photoService.add(newPhoto);
        if(!savedPhoto) {
            return new ApiResponse("error", -4001);
        }

        return savedPhoto;
    }

    async createThumb(photo) {
        const originalFilePath = photo.path;
        const fileName = photo.filename;

        const destinationFilePath = StorageConfig.photo.destination + StorageConfig.photo.resize.thumb.directory + fileName;
        await  sharp(originalFilePath)
                .resize({
                    fit: 'cover',
                    width: StorageConfig.photo.resize.thumb.width,
                    height: StorageConfig.photo.resize.thumb.height
                })
                .toFile(destinationFilePath);
    }

    async createSmallImage(photo) {
        const originalFilePath = photo.path;
        const fileName = photo.filename;

        const destinationFilePath = StorageConfig.photo.destination + StorageConfig.photo.resize.small.directory + fileName;
        await  sharp(originalFilePath)
                .resize({
                    fit: 'cover',
                    width: StorageConfig.photo.resize.small.width,
                    height: StorageConfig.photo.resize.small.height
                })
                .toFile(destinationFilePath);
    }

}