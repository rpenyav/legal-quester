import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(
    source: Buffer | string, // Ahora puede ser un Buffer o una URL
    options?: UploadApiOptions,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      // Determinamos si el origen es un buffer o una URL
      const isBuffer = Buffer.isBuffer(source);
      const imagePayload = isBuffer
        ? 'data:image/jpeg;base64,' + source.toString('base64')
        : source;

      cloudinary.uploader.upload(imagePayload, options, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
