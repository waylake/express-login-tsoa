import { type File } from "./interfaces/file";
import { Schema, model } from "mongoose";

export const fileSchema = new Schema<File>({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  size: Number, // Byte 표기
  bucketName: String, // S3 Bucket
  url: String, // S3 link or Local Server
  previewUrl: [String], // preview images url
  tokenLength: Number, // LLM에 넣을 때 고려하려면 미리 준비해놓아야 함
  price: Number, // optional 필드. 무료인 경우 없을 수도 있습니다.
  metadata: {
    lang: String,
    content: String,
    description: String,
    categories: [Number],
    tags: [String],
  },
});

export const FileModel = model<File>("File", fileSchema);
