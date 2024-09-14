import { Controller, Get, UseGuards } from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { AuthGuard } from '../../guards';

@Controller('departments')
export class DepartmetnsController {
    constructor(private readonly departmentsService: DepartmentsService) { }
    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.departmentsService.findAll();
    }
}