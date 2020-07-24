import { Injectable } from '@angular/core';

const FILE_TYPES = [
  'application/ogg',
  'application/vnd.apple.mpegurl',
  'application/x-mpegURL',
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  validateFile(file: File): boolean {
    return FILE_TYPES.includes(file.type);
  }
}
