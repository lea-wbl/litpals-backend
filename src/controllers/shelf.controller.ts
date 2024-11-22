import { Request, Response } from "express";
import userSchema from "../models/user.model";

export const shelfController = {
  updateShelf: async function (req: Request, res: Response) {
    console.log("HEREEEE");
    const {
      previousShelf,
      shelf,
      bookId,
      thumbnail,
    }: {
      previousShelf: string;
      shelf: string;
      bookId: string;
      thumbnail: string;
    } = req.body;

    const bookshelf = await userSchema
      .findOne({ uid: req.params.id })
      .select("bookshelf");
    console.log(bookshelf);

    // if (!bookshelf) {
    //   return res.status(404).json({ message: "Shelf not found" });
    // }

    // if (!bookshelf[shelf]) {
    //   return res.status(400).json({ message: "Invalid shelf specified" });
    // }

    // const newBook = { id: bookId, thumbnail: thumbnail };

    // if (previousShelf !== undefined) {
    //   bookshelf[previousShelf] = bookshelf[previousShelf].filter(
    //     (item: any) => item.id !== bookId
    //   );
    // }
    // if (shelf !== previousShelf) bookshelf[shelf].push(newBook);
    // await bookshelf.save();

    // res.status(200).json(bookshelf);
  },
};
