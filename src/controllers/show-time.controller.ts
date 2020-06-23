import { Controller, Get } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { TicketService } from "src/services/ticket/ticket.service";
import { ShowTime } from "src/entities/show-time.entity";

@Controller('api/showtime')
export class ShowTimeController {
    constructor(public service: TicketService) {}

    @Get()
    getAll(): Promise<ShowTime[]> {
        return this.service.getAllTimes();
    }
} 