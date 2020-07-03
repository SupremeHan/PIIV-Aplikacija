import { Controller, Get, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { TicketService } from "src/services/ticket/ticket.service";
import { ShowTime } from "src/entities/show-time.entity";
import { AddShowtimeDto } from "src/dto/ticket/add.showtime.dto";

@Controller('api/showtime')
export class ShowTimeController {
    constructor(public service: TicketService) {}

    @Get()
    getAll(): Promise<ShowTime[]> {
        return this.service.getAllTimes();
    }

    @Post('createShowtime')
    createShowtime(@Body() data: AddShowtimeDto) {
        return this.service.createShowTime(data);
    }
} 