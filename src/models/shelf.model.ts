import { Document, Schema, model } from "mongoose";

export interface IShelf extends Document {
  name: string;
  type: "tbr" | "wishlist" | "reading" | "read" | "favorites" | "custom";
  books: [];
}

const shelfSchema = new Schema<IShelf>({
  name: { type: String },
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ["tbr", "wishlist", "reading", "read", "favorites", "custom"],
  },
  books: { type: [] },
});

export default model<IShelf>("Shelf", shelfSchema);
