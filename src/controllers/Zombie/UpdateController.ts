import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ZombieService } from '@/services/ZombieService';
import { Zombie } from '@/entities/Zombie';
import { UpdateZombieDto } from '@/dto/zombie/UpdateZombieDto';

@Controller('api')
export class UpdateController {
    constructor(private zombieService: ZombieService) {}

    @Patch('zombies/:id')
    invoke(@Param('id') id: string, @Body() zombie: UpdateZombieDto): Promise<Zombie> {
        return this.zombieService.update(id, zombie);
    }
}
