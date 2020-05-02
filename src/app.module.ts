import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'config/database.config';
import { Admin } from 'entities/admin.entity';
import { Movie } from 'entities/movie.entity';
import { Ticket } from 'entities/ticket.entity';
import { User } from 'entities/user.entity';
import { AdminService } from './services/admin/admin.service';
import { AdminController } from './controllers/api/admin.controller';
import { MovieService } from './services/movie/movie.service';
import { MovieController } from './controllers/api/movie.controller';
import { AuthController } from './controllers/api/auth.controller';

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
     ])
  ],
  controllers: [ AppController,
                 AdminController,
                 MovieController,
                 AuthController
               ],
  providers: [ 
              AdminService,
              MovieService, 
            ],
})
export class AppModule {}
