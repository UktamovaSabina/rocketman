import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/mapped-types'; 
import { IsEnum, IsString, Length } from "class-validator";
import { RegisterDto } from "./register.dto";

enum AdminRole {
    ADMIN = "admin",
    SUPER_ADMIN = "super-admin"
}

export class UpdateAdminDto extends PartialType(RegisterDto) {
    @ApiProperty({ type: String, example: "John" })
    @IsString()
    username: string;

    @ApiProperty({ type: String, example: "12345678" })
    @IsString()
    @Length(8)
    password: string;

    @ApiProperty({ type: AdminRole, enum: AdminRole })
    @IsEnum(AdminRole)
    role?: AdminRole;
}
