import { Post, Controller, Body } from '@nestjs/common';
import { Item } from '@/entities/Item';
import { CreateItemDto } from '@/dto/item/CreateItemDto';
import { ItemService } from '@/services/ItemService';

@Controller('api')
export class CreateController {
    constructor(private itemService: ItemService) {}

    @Post('items')
    invoke(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.create(createItemDto);
    }
}
