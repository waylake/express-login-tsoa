import { Schema, model } from "mongoose";
import { User } from "@/api/v1/models/interfaces/user";

const userSchema = new Schema<User>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password should be at least 8 characters long"],
    },
    isVerified: { type: Boolean, default: false },
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true },
);

export const UserModel = model<User>("User", userSchema);
