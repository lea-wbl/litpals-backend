import { Document, Schema, model } from "mongoose";

export interface IBookshelf extends Document {
  tbr: [];
  wishlist: [];
  reading: [];
  read: [];
  favorites: [];
  [key: string]: [] | any;
}

const bookshelfSchema = new Schema<IBookshelf>(
  {
    tbr: { type: [] },
    wishlist: { type: [] },
    reading: { type: [] },
    read: { type: [] },
    favorites: { type: [] },
  },
  { strict: false }
);

export default model<IBookshelf>("Bookshelf", bookshelfSchema);
