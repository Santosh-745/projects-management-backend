import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dtos';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { ICurrentUser } from '../../shared/interfaces';

@Controller('positions')
export class PositionsController {
    constructor(private readonly positionService: PositionsService) { }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() createPositionDto: CreatePositionDto, @CurrentUser() user: ICurrentUser) {
        return this.positionService.create(createPositionDto, user?.sub);
    }

    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.positionService.findAll();
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    delete(@Param('id') id: string) {
        return this.positionService.delete(+id);
    }
}
