import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    @ApiProperty()
    itemId: string;

    @IsNotEmpty()
    @ApiProperty()
    zombieId: string;
}
