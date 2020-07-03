import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "src/entities/ticket.entity";
import { Repository } from "typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AddTicketDto } from "src/dto/ticket/add.ticket.dto";
import { ApiResponse } from "src/misc/api.response";
import { Movie } from "src/entities/movie.entity";
import { ShowTime } from "src/entities/show-time.entity";
import { AddShowtimeDto } from "src/dto/ticket/add.showtime.dto";

@Injectable()
export class TicketService extends TypeOrmCrudService<Ticket>{
    constructor(
        @InjectRepository(Ticket) 
        private readonly ticket: Repository<Ticket>,

        @InjectRepository(ShowTime)
        private readonly showTime: Repository<ShowTime>,

    ) { super(ticket); }

    getAll(): Promise<Ticket[]> {
        return this.ticket.find();
    }

    getById(id: number): Promise<Ticket> {
        return this.ticket.findOne(id);
    }
    
    getAllTimes(): Promise<ShowTime[]> {
        return this.showTime.find();
    }

    async createTicket(data: AddTicketDto): Promise<Ticket | ApiResponse> {
        let newTicket: Ticket = new Ticket();
        newTicket.seats = data.seats;
        newTicket.forename = data.forename;
        newTicket.surname = data.surname;
        newTicket.phone = data.phone;
        newTicket.showTimeId = data.showTimeId;

        let savedTicket = await this.ticket.save(newTicket);

        return await this.ticket.findOne(savedTicket.ticketId);
    }

    async createShowTime(data: AddShowtimeDto): Promise<ShowTime | ApiResponse> {
        let newShowtime: ShowTime = new ShowTime();
        newShowtime.screeningRoom = data.screeningRoom;
        newShowtime.time = data.time;
        newShowtime.dateAt = data.dateAt;
        newShowtime.dateTo = data.dateTo;
        newShowtime.movieId = data.movieId;

        let saved = await this.showTime.save(newShowtime);
        
        return await this.showTime.findOne(saved.showTimeId);
    }
}