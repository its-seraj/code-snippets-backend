import { mongoose, Schema } from "mongoose";

const lofiImg = new Schema(
  {
    images: { type: Object },
    isDeleted: { type: Boolean, default: false },
  },
  { strict: false, timestamps: true, versionKey: false }
);

lofiImg.index({ userId: 1 });

export const lofiImgModel = mongoose.model("lofiImg", lofiImg);
