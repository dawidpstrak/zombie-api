import { Body, Controller, Post } from '@nestjs/common';
import { ZombieService } from '@/services/ZombieService';
import { Zombie } from '@/entities/Zombie';
import { CreateZombieDto } from '@/dto/zombie/CreateZombieDto';

@Controller('api')
export class CreateController {
    constructor(private zombieService: ZombieService) {}

    @Post('zombies')
    invoke(@Body() createZombieDto: CreateZombieDto): Promise<Zombie> {
        return this.zombieService.create(createZombieDto);
    }
}
