import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'config/database.config';
import { Admin } from 'src/entities/admin.entity';
import { Movie } from 'src/entities/movie.entity';
import { Ticket } from 'src/entities/ticket.entity';
import { User } from 'src/entities/user.entity';
import { AdminService } from './services/admin/admin.service';
import { AdminController } from './controllers/api/admin.controller';
import { MovieService } from './services/movie/movie.service';
import { MovieController } from './controllers/api/movie.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserController } from './controllers/api/user.controller';
import { UserService } from './services/user/user.service';

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
          User,
       ]
    }),
    TypeOrmModule.forFeature([   // Repository
        Admin,
        Movie,
        User
     ])
  ],
  controllers: [ AppController,
                 AdminController,
                 MovieController,
                 AuthController,
                 UserController,
               ],
  providers: [ 
              AdminService,
              MovieService,
              UserService, 
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
    .forRoutes('api/*');
  }
}
