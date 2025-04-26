import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageService {
  async generateImage(
    width: number,
    height: number,
    text?: string,
    bgColor = '#cccccc',
    format: 'png' | 'jpeg' | 'webp' = 'png',
  ): Promise<Buffer> {
    const svgText = `
      <svg width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="${bgColor}" />
        <text x="50%" y="50%" font-size="24" dominant-baseline="middle" text-anchor="middle" fill="#000">
          ${text || `${width}x${height}`}
        </text>
      </svg>
    `;

    return await sharp(Buffer.from(svgText)).toFormat(format).toBuffer();
  }
}
