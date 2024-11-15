import { Document, Schema, model } from "mongoose";

interface IBook extends Document {
  id: string;
  title: string;
  thumbnail: string;
}

const bookSchema = new Schema<IBook>({
  id: { type: String },
  title: { type: String },
  thumbnail: { type: String },
});

export default model<IBook>("Book", bookSchema);
