import mongoose from "mongoose";
import shortid from "shortid";
import { getModelForClass } from "@typegoose/typegoose";

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: { type: String, default: shortid.generate },
  date: { type: String, default: Date.now }
});

export default mongoose.model("Url", urlSchema);
// export class Url {
//   longUrl: {
//     type: String;
//     required: true;
//   };
//   shortUrl: { type: string };
//   date: { type: number };
// }

// export const tseting = getModelForClass(Url);
