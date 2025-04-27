import { Controller, Get, Query, Res } from '@nestjs/common';
import { GenerateImageDto } from './dto/generate-image.dto';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from './dto/error-response.dto';
import { ImagePureimageService } from './image-pureimage.service';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImagePureimageService) {}

  @Get()
  @ApiOkResponse({ description: '成功產生圖片' })
  @ApiBadRequestResponse({
    description: '請求參數錯誤',
    type: ErrorResponseDto,
  })
  async getImage(@Query() query: GenerateImageDto, @Res() res: Response) {
    const [widthStr, heightStr] = query.size.split('x');
    const width = parseInt(widthStr);
    const height = parseInt(heightStr);

    if (isNaN(width) || isNaN(height) || width > 500 || height > 500) {
      res.status(400).send({
        error: 'BAD_REQUEST',
        message: 'Invalid size: maximum dimensions are 500x500',
      });
      return;
    }

    const buffer = await this.imageService.generateImage(
      width,
      height,
      query.text,
      query.bgColor ? `#${query.bgColor}` : undefined,
      query.format || 'png',
    );

    res.setHeader('Content-Type', `image/${query.format || 'png'}`);
    res.send(buffer);
    return;
  }
}
