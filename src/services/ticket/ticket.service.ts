import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "src/entities/ticket.entity";
import { Repository } from "typeorm";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket) 
        private readonly ticket: Repository<Ticket>
    ) {}

    getAll(): Promise<Ticket[]> {
        return this.ticket.find();
    }

    getById(id: number): Promise<Ticket> {
        return this.ticket.findOne(id);
    }    
}