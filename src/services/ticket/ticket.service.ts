import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "src/entities/ticket.entity";
import { Repository } from "typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class TicketService extends TypeOrmCrudService<Ticket>{
    constructor(
        @InjectRepository(Ticket) 
        private readonly ticket: Repository<Ticket>
    ) { super(ticket); }

    getAll(): Promise<Ticket[]> {
        return this.ticket.find();
    }

    getById(id: number): Promise<Ticket> {
        return this.ticket.findOne(id);
    }    
}