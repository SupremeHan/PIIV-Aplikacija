import { Controller, Get, Param } from "@nestjs/common";
import { TicketService } from "src/services/ticket/ticket.service";
import { Ticket } from "src/entities/ticket.entity";
import { ApiResponse } from "src/misc/api.response";
import { async } from "rxjs/internal/scheduler/async";
import { resolve } from "dns";
import { Crud } from "@nestjsx/crud";

@Controller('api/ticket')
@Crud({
    model: {
        type: Ticket
    },
    params: {
        id: {
            field: 'id',
            type: 'number',
            primary: true
        }
    },
    // Nije jos resen problem, ne prikazuje usera
    query: {
        join: {
            user: {
                eager: true
            }
        }
    }
})
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Get()
    getAll(): Promise<Ticket[]> {
        return this.ticketService.getAll();
    }

    @Get(':id')
    getById(@Param('id') ticketId: number): Promise<Ticket | ApiResponse> {
        return new Promise(async (resolve) => {
            let ticket = await this.ticketService.getById(ticketId);

            if(ticket == undefined) {
                resolve(new ApiResponse("error", -7001));
            }
            resolve(ticket);
        }) 
    }

}