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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: 3306,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [
          Admin,
          Movie,
          Ticket,
          User,
       ]
    }),
    TypeOrmModule.forFeature([ 
        Admin
     ])
  ],
  controllers: [ AppController,
                 AdminController
               ],
  providers: [ AdminService ],
})
export class AppModule {}
