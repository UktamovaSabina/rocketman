import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, Length } from "class-validator";

enum AdminRole {
    ADMIN = "admin",
    SUPER_ADMIN = "super-admin"
}

export class RegisterDto {
    @ApiProperty({type: String, example: "John"})
    @IsString()
    username: string;

    @ApiProperty({type: String, example: "12345678"})
    @IsString()
    @Length(8)
    password: string;

    @ApiProperty({type: AdminRole, enum: AdminRole})
    @IsEnum(AdminRole)
    role?: AdminRole;
}
