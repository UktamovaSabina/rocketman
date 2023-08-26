import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDefined, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id?: number

    @ApiProperty()
    @IsDefined()
    @IsString()
    @Length(2)
    firstname: string

    @ApiProperty()
    @IsString()
    lastname: string

    @ApiProperty({ type: String })
    @IsDefined()
    @IsString()
    @Length(13, 13)
    phone_number: string
}
