import { Injectable } from '@nestjs/common';
import * as sharpModule from 'sharp';
import type { Sharp } from 'sharp';

// 創造一個型別安全的 createSharp 函式
const createSharp = (input: Buffer | string): Sharp => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  const possibleSharp = (sharpModule as any).default ?? sharpModule;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return possibleSharp(input) as Sharp;
};

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

    return await createSharp(Buffer.from(svgText)).toFormat(format).toBuffer();
  }
}
