import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImagePureimageService } from './image-pureimage.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, ImagePureimageService],
})
export class ImageModule {}
