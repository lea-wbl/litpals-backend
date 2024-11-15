import { Request, Response } from "express";
import bookshelfSchema, { IBookshelf } from "../models/bookshelf.models";

export const bookshelfController = {
  //   createBook: async function (req: Request, res: Response) {
  //     try {
  //       const dataToSave = req.body;

  //       for (const item of dataToSave) {
  //         const alreadyExists = await bookSchema.findOne({ id: item.id });

  //         if (!alreadyExists) {
  //           const book = await bookSchema.create({
  //             id: item.id,
  //             title: item.title,
  //             thumbnail: item.thumbnail,
  //           });
  //         }
  //       }

  //       res.status(201).send("Data saved successfully!");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  getBookshelf: async function (req: Request, res: Response) {
    const { id } = req.params;
    console.log("booksheeeelllllfff IIIIDDDD", id);

    try {
      const foundBookshelf = await bookshelfSchema
        .findById(id)
        .select("-_id -__v");
      console.log("founnnnd bookshelf", foundBookshelf);

      if (foundBookshelf)
        return res.status(200).json({ bookshelf: foundBookshelf });
    } catch (error) {
      console.log(error);
    }
  },
  updateBookshelf: async function (req: Request, res: Response) {
    console.log("HEREEEE");
    const {
      previousShelf,
      shelf,
      bookId,
      thumbnail,
    }: {
      previousShelf: keyof IBookshelf;
      shelf: keyof IBookshelf;
      bookId: string;
      thumbnail: string;
    } = req.body;

    const bookshelf = await bookshelfSchema.findById(req.params.id);
    console.log(bookshelf);

    if (!bookshelf) {
      return res.status(404).json({ message: "Shelf not found" });
    }

    if (!bookshelf[shelf]) {
      return res.status(400).json({ message: "Invalid shelf specified" });
    }

    const newBook = { id: bookId, thumbnail: thumbnail };

    if (previousShelf !== undefined) {
      bookshelf[previousShelf] = bookshelf[previousShelf].filter(
        (item: any) => item.id !== bookId
      );
    }
    if (shelf !== previousShelf) bookshelf[shelf].push(newBook);
    await bookshelf.save();

    res.status(200).json(bookshelf);
  },
  createShelf: async function (req: Request, res: Response) {
    console.log("HELOOO ??");

    const { name }: { name: string } = req.body;

    console.log("NAME", name);

    try {
      const bookshelf = await bookshelfSchema.findById(req.params.id);

      if (!bookshelf) {
        return res.status(404).json({ error: "Bookshelf not found" });
      }

      if (bookshelf[name]) {
        return res.status(400).json({ error: "Shelf already exists" });
      }

      bookshelf[name] = [];

      console.log("new shelf", bookshelf, bookshelf[name]);

      await bookshelf.save();

      res.status(201).json(bookshelf);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error adding shelf", details: error.message });
    }
  },
};
