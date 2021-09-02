import { ZombieService } from '@/services/ZombieService';
import { Controller, Param, Delete, Response, HttpStatus } from '@nestjs/common';

@Controller('api')
export class DeleteController {
    constructor(private zombieService: ZombieService) {}

    @Delete('zombies/:id')
    async invoke(@Param('id') id: string, @Response() res): Promise<void> {
        await this.zombieService.delete(id);

        return res.sendStatus(HttpStatus.NO_CONTENT);
    }
}
