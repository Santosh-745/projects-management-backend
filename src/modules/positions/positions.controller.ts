import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto, FilterDto, ListPositionsResponseDto } from './dtos';
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

    @Get(":id")
    @UseGuards(AuthGuard)
    findAll(@Param('id') id: string, @Query() query: FilterDto): Promise<ListPositionsResponseDto> {
        return this.positionService.findAll(+id, query);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    delete(@Param('id') id: string) {
        return this.positionService.delete(+id);
    }
}
