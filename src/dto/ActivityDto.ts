import { IsString, IsNotEmpty } from "class-validator";

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateActivityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
