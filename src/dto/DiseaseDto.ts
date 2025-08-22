import { IsString, IsArray, ArrayMinSize } from "class-validator";

export class CreateDiseaseDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  symptoms: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  precautions: string[];
}

export class UpdateDiseaseDto {
  @IsString()
  name?: string;

  @IsArray()
  @IsString({ each: true })
  symptoms?: string[];

  @IsArray()
  @IsString({ each: true })
  precautions?: string[];
}
