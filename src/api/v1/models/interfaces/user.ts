import { Types } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  files: Types.ObjectId[] | null;
}
