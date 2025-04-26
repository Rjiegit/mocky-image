import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class GenerateImageDto {
  @ApiProperty({ example: '300x200', description: '圖片尺寸，格式為 寬x高' })
  @Matches(/^\d+x\d+$/, { message: 'size 格式必須是 寬x高，例如 300x200' })
  size: string;

  @ApiProperty({
    example: 'Hello World',
    required: false,
    description: '圖片中顯示的文字',
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    example: 'ffcc00',
    required: false,
    description: '背景色，六位 HEX 格式，不含#',
  })
  @IsOptional()
  @Matches(/^[0-9a-fA-F]{6}$/, { message: 'bgColor 必須是6位HEX色碼' })
  bgColor?: string;

  @ApiProperty({
    example: 'png',
    required: false,
    enum: ['png', 'jpeg', 'webp'],
    description: '輸出格式',
  })
  @IsOptional()
  @Matches(/^(png|jpeg|webp)$/i, {
    message: 'format 必須是 png, jpeg, 或 webp',
  })
  format?: 'png' | 'jpeg' | 'webp';
}
