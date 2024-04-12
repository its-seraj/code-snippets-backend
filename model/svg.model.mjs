import { mongoose, Schema } from "mongoose";

const svg = new Schema(
  {
    svgUuid: { type: String, unique: true, required: true },
    title: { type: String },
    category: { type: String },
    svg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { strict: false, timestamps: true, versionKey: false }
);

export const svgModel = mongoose.model("svg", svg);
