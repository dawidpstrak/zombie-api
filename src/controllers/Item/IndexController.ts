import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from '@/services/ItemService';
import ZombieItemsWithPrice from '@/interfaces/ZombieItemsWithPrice';
import { ApiParam } from '@nestjs/swagger';

@Controller('api')
export class IndexController {
    constructor(private itemService: ItemService) {}

    @Get('items/zombie/:id')
    @ApiParam({ name: 'id', required: true })
    invoke(@Param() id: string): Promise<ZombieItemsWithPrice> {
        return this.itemService.findAll(id);
    }
}
