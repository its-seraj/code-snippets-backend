import { mongoose, Schema } from "mongoose";

const cards = new Schema(
  {
    cardUuid: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    title: { type: String },
    category: {
      type: String,
      enum: ["Data Quality and Coverage", "Engagement", "Intent", "Potential Opportunity", "Deal", "Customer"],
    },
    description: { type: String },
    images: { type: Object },
    cardType: { type: String, enum: ["default", "special", "user"] },
    displayorder: { type: Number },
    isDeleted: { type: Boolean, default: false },
  },
  { strict: false, timestamps: true, versionKey: false }
);

cards.index({ userId: 1 });

export const cardModel = mongoose.model("cards", cards);
