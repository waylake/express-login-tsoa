import { Types } from "mongoose";

export interface File {
  owner: Types.ObjectId;
  fileName: string;
  uploadDate: Date;
  size: number; // Byte 표기
  bucketName: string; // S3 Bucket
  url: string; // S3 link or Local Server
  previewUrl?: string[]; // preview images url
  tokenLength?: number; // LLM에 넣을 때 고려하려면 미리 준비해놓아야 함
  price?: number; // optional 필드. 무료인 경우 없을 수도 있습니다.
  metadata?: {
    lang: string;
    content: string; // 목차 required
    description?: string;
    categories?: number[];
    tags?: string[];
  };
}
