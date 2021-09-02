import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteItemDto {
    @IsNotEmpty()
    @ApiProperty()
    itemId: string;

    @IsNotEmpty()
    @ApiProperty()
    zombieId: string;
}
