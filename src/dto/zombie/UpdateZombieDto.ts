import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateZombieDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
