import { Schema, model } from "mongoose";

const foldersSchema = new Schema({
  genderName: { type: String, required: true },
  createdAt: Date,
});

export default model("Folders", foldersSchema);
