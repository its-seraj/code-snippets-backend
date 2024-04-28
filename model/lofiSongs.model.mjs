import { mongoose, Schema } from "mongoose";

const lofiSongs = new Schema(
  {
    song: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { strict: false, timestamps: true, versionKey: false }
);

lofiSongs.index({ userId: 1 });

export const lofiSongsModel = mongoose.model("lofiSongs", lofiSongs);
