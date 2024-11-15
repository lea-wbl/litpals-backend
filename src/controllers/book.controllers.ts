import { Request, Response } from "express";
import bookSchema from "../models/book.models";

export const bookController = {
  createBook: async function (req: Request, res: Response) {
    try {
      const dataToSave = req.body;

      for (const item of dataToSave) {
        const alreadyExists = await bookSchema.findOne({ id: item.id });

        if (!alreadyExists) {
          const book = await bookSchema.create({
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
          });
        }
      }

      res.status(201).send("Data saved successfully!");
    } catch (error) {
      console.log(error);
    }
  },
  getBook: async function (req: Request, res: Response) {
    const { books } = req.query;
    console.log("booooooooks", books);

    try {
      const foundBooks = await bookSchema.find({ id: { $in: books } });
      console.log("founnnnd", foundBooks);

      if (foundBooks) return res.status(200).json({ books: foundBooks });
    } catch (error) {
      console.log(error);
    }
  },
};
