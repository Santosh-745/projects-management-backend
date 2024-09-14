import { Controller, Get, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AuthGuard } from '../../guards';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }
    @Get()
    @UseGuards(AuthGuard)
    
    findAll() {
        return this.locationsService.findAll();
    }
}