import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateJobDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() company: string;
  @IsString() @IsOptional() companylogo?: string;
  @IsString() @IsNotEmpty() location: string;
  @IsString() @IsNotEmpty() jobtype: string;
  @IsString() @IsNotEmpty() experience: string;
  @IsInt() salarymin: number;
  @IsInt() salarymax: number;
  @IsString() @IsOptional() salarydisplay?: string;
  @IsString() @IsNotEmpty() description: string;
  @IsArray() requirements: string[];
  @IsArray() benefits: string[];
  @IsDateString() applicationdeadline: string;
  @IsBoolean() isremote: boolean;
}
