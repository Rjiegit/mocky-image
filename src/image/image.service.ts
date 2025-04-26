import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return await (sharp as any)(Buffer.from(svgText))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .toFormat(format)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .toBuffer();
  }
}
