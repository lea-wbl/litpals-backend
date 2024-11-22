import mongoose, { Document, Schema, Types, model } from "mongoose";

interface IUser extends Document {
  uid: string;
  avatar: string;
  username: string;
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
  birthdatePrivate: boolean;
  country: string;
  city: string;
  bio: string;
  readingHabits: {
    bookTypes: string[];
    readingLanguages: string;
    format: string;
  };
  readingPreferences: {
    favoriteGenres: string[];
    favoriteTropes: string[];
    favoriteAuthors: string[];
  };
  bookshelf: [];
  // bookshelf: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  uid: { type: String, required: true },
  avatar: { type: String, required: false },
  username: { type: String, required: true },
  birthdate: {
    day: { type: String },
    month: { type: String },
    year: { type: String },
  },
  birthdatePrivate: { type: Boolean },
  country: { type: String },
  city: { type: String },
  bio: { type: String },
  readingHabits: {
    bookTypes: { type: Array<string> },
    readingLanguages: { type: String },
    format: { type: String },
  },
  readingPreferences: {
    favoriteGenres: { type: Array<string> },
    favoriteTropes: { type: Array<string> },
    favoriteAuthors: { type: Array<string> },
  },
  bookshelf: [],
  // bookshelf: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Shelf",
  //   },
  // ],
});

export default model<IUser>("User", userSchema);
