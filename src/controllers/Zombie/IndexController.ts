import { Controller, Get } from '@nestjs/common';
import { ZombieService } from '@/services/ZombieService';
import { Zombie } from '@/entities/Zombie';

@Controller('api')
export class IndexController {
    constructor(private zombieService: ZombieService) {}

    @Get('zombies')
    getZombies(): Promise<Zombie[]> {
        return this.zombieService.findAll();
    }
}
