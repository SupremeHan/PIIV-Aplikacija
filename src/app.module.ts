import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'config/database.config';
import { Admin } from 'entities/admin.entity';
import { Movie } from 'entities/movie.entity';
import { Ticket } from 'entities/ticket.entity';
import { User } from 'entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: 3306,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [  ]
    }),
    TypeOrmModule.forFeature([ 
        Admin,
        Movie,
        Ticket,
        User
     ])
  ],
  controllers: [AppController],
  providers: [  ],
})
export class AppModule {}
