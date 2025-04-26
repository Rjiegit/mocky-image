import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 'BAD_REQUEST', description: '錯誤類型' })
  error: string;

  @ApiProperty({ example: 'Invalid size format', description: '錯誤描述' })
  message: string;
}
