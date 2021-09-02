import { Controller, Delete, Response, HttpStatus, Body } from '@nestjs/common';
import { ItemService } from '@/services/ItemService';
import { DeleteItemDto } from '@/dto/item/DeleteItemDto';

@Controller('api')
export class DeleteController {
    constructor(private itemService: ItemService) {}

    @Delete('items')
    async invoke(@Body() deleteItemDto: DeleteItemDto, @Response() response): Promise<void> {
        await this.itemService.delete(deleteItemDto);

        return response.sendStatus(HttpStatus.NO_CONTENT);
    }
}
