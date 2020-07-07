import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'config/database.config';
import { Admin } from 'src/entities/admin.entity';
import { Movie } from 'src/entities/movie.entity';
import { Ticket } from 'src/entities/ticket.entity';
import { AdminService } from './services/admin/admin.service';
import { AdminController } from './controllers/admin.controller';
import { MovieService } from './services/movie/movie.service';
import { MovieController } from './controllers/movie.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket/ticket.service';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './services/photo/photo.service';
import { AdminToken } from './entities/admin-token.entity';
import { ShowTime } from './entities/show-time.entity';
import { ShowTimeController } from './controllers/show-time.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: 3306,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [                         // Entities
          Admin,
          Movie,
          Ticket,
          Photo,
          AdminToken,
          ShowTime,
       ]
    }),
    TypeOrmModule.forFeature([   // Repository
        Admin,
        Movie,
        Ticket,
        Photo,
        AdminToken,
        ShowTime,
     ])
  ],
  controllers: [ AppController,
                 AdminController,
                 MovieController,
                 AuthController,
                 TicketController,
                 ShowTimeController,
               ],
  providers: [ 
              AdminService,
              MovieService,
              TicketService,
              PhotoService
            ],
  exports: [
    AdminService
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/*')
    //.forRoutes({path: 'api/*', method: RequestMethod.POST},
    //          {path: 'api/*', method: RequestMethod.PATCH},
    //          {path: 'api/*', method: RequestMethod.DELETE},
    //          {path: 'api/*', method: RequestMethod.PUT})
  }
}
