import { Schema, model } from "mongoose";

const songSchema = new Schema({
  numberSong: { type: Number, required: true },
  nameSong: { type: String, required: true },
  createdAt: Date,
  folders: {
    type: Schema.Types.ObjectId,
    ref: "folders",
  },
});

export default model("Song", songSchema);
