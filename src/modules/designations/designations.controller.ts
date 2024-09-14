import { Controller, Get, UseGuards } from '@nestjs/common';
import { DesignationsService } from './designations.service';
import { AuthGuard } from '../../guards';

@Controller('designations')
export class DesignationsController {
    constructor(private readonly designationsService: DesignationsService) { }
    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.designationsService.findAll();
    }
}