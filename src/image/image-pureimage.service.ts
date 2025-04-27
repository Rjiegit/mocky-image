import { Injectable } from '@nestjs/common';
import * as PImage from 'pureimage';
import { Writable } from 'stream';
import * as path from 'node:path';

@Injectable()
export class ImagePureimageService {
  async generateImage(
    width: number,
    height: number,
    text?: string,
    bgColor = '#cccccc',
    format: 'png' | 'jpeg' = 'png', // pureimage 主要支援 png, jpeg
  ): Promise<Buffer> {
    // 創建畫布
    const img = PImage.make(width, height);
    const ctx = img.getContext('2d');

    // 填背景色
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // 輸出成 Buffer
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const stream = new Writable({
        write(chunk, encoding, callback) {
          chunks.push(chunk);
          callback();
        },
      });

      stream.on('finish', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);

      if (format === 'jpeg') {
        PImage.encodeJPEGToStream(img, stream);
      } else {
        PImage.encodePNGToStream(img, stream);
      }
    });

    return buffer;
  }
}
