import { Controller, Get, Param } from '@nestjs/common';
import { ZombieService } from '@/services/ZombieService';
import { Zombie } from '@/entities/Zombie';

@Controller('api')
export class ShowController {
    constructor(private zombieService: ZombieService) {}

    @Get('zombies/:id')
    showZombie(@Param('id') id: string): Promise<Zombie> {
        return this.zombieService.findOne(id);
    }
}
