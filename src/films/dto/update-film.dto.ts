import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

// Semua field opsional karena dipakai untuk PATCH (ubah sebagian data)
export class UpdateFilmDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  judul?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  genre?: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(2030)
  tahun?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsBoolean({ message: 'sudahDitonton harus berupa boolean' })
  sudahDitonton?: boolean;
}
