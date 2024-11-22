import { Request, Response } from "express";
import userSchema from "../models/user.model";
import shelfSchema, { IShelf } from "../models/shelf.model";

export const userController = {
  createUser: async function (req: Request, res: Response) {
    console.log("bfkjhdbncfikjnlksaejfqljelihnfgklhneilq");

    const { user, bookshelf } = req.body;

    // if (!username || !birthdate)
    //   res.status(400).json({ error: "Missing required field(s)" });

    try {
      const newBookshelf = [];
      for (const shelf in bookshelf) {
        if (Object.prototype.hasOwnProperty.call(bookshelf, shelf)) {
          const element = bookshelf[shelf];
          let name: string = "";
          switch (shelf) {
            case "tbr":
              name = "TBR";
              break;
            case "wishlist":
              name = "Wishlist";
              break;
            case "reading":
              name = "Reading";
              break;
            case "read":
              name = "Read";
              break;
            case "favorites":
              name = "Favorites";
              break;
            default:
              break;
          }
          // const newShelf = new shelfSchema({
          //   name: name,
          //   type: shelf,
          //   books: element as [],
          // });
          // console.log("new shelf", newShelf);

          // const savedShelf = await newShelf.save();

          // if (savedShelf) newBookshelf.push(newShelf);

          const newShelf = {
            name: name,
            type: shelf,
            books: element as [],
          };
          console.log("new shelf", newShelf);
          newBookshelf.push(newShelf);
        }
      }

      console.log("new 2", newBookshelf);

      // const newBookshelf = new bookshelfSchema(bookshelf);
      // console.log("new shelf", newBookshelf);
      // const savedBookshelf = await newBookshelf.save();
      // console.log("saved shelf", savedBookshelf);

      const newUser = new userSchema({
        ...user,
        bookshelf: newBookshelf,
      });
      console.log("new user", newUser);

      const savedUser = await newUser.save();
      console.log("saved user", savedUser);

      // const userData = await userSchema.create({
      //   user,
      // });
      res.status(201).json({ user: savedUser._id });
    } catch (error) {
      console.log(error);
    }
  },
  checkUsername: async function (req: Request, res: Response) {
    console.log("here ?");

    const { username } = req.query;
    try {
      const userExists = await userSchema.findOne({
        "personalInfo.username": username,
      });
      if (userExists) {
        return res.status(200).json({ isAvailable: false });
      } else {
        return res.status(200).json({ isAvailable: true });
      }
    } catch (error) {
      res.status(500).json({ message: "Error checking username", error });
    }
  },
  getOneUser: async function (req: Request, res: Response) {
    console.log("coucou");

    const { id } = req.params;
    console.log("iddddd", id);

    try {
      const foundUser = await userSchema.findOne({
        uid: id,
      });
      if (foundUser) return res.status(200).json({ user: foundUser });
    } catch (error) {
      console.log(error);
    }
  },
  getBookshelf: async function (req: Request, res: Response) {
    const { id } = req.params;
    console.log("getBookshelf user id:", id);

    try {
      const bookshelf = await userSchema
        .findOne({ uid: req.params.id })
        .select("bookshelf");
      // .populate("bookshelf");
      if (bookshelf) res.status(200).json(bookshelf);
    } catch (error: any) {
      res.status(500).json({
        error: "Error founding user's bookshelf",
        details: error.message,
      });
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
      previousShelf: string;
      shelf: string;
      bookId: string;
      thumbnail: string;
    } = req.body;

    console.log("BODY", req.body);

    const user = await userSchema.findOne({ uid: req.params.id });
    console.log("iciiiiii", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBook = { id: bookId, thumbnail: thumbnail };

    if (previousShelf !== undefined) {
      const shelf: any = user.bookshelf.find(
        (shelf: any) => shelf.type === previousShelf
      );
      shelf.books = shelf.books.filter((item: any) => item.id !== bookId);
    }

    if (shelf !== previousShelf) {
      const foundShelf: any = user.bookshelf.find((s: any) => s.type === shelf);

      if (foundShelf) foundShelf.books.push(newBook);
      console.log("FOUND SHELF", foundShelf);
    }
    console.log("coucou", user.bookshelf);

    user.markModified("bookshelf");

    try {
      await user.save();
      res.status(200).json(user.bookshelf);
    } catch (error) {
      console.log(error);
    }
  },
  checkStatus: async function (req: Request, res: Response) {
    const { id, bookId } = req.params;

    try {
      // Find the user and populate the bookshelf
      const library = await userSchema
        .findOne({ uid: id })
        .select("bookshelf")
        .populate("bookshelf");

      console.log("usur", library);

      if (!library) {
        return res.status(404).json({ message: "User not found" });
      }

      // Ensure the populated bookshelf exists
      if (library.bookshelf && Array.isArray(library.bookshelf)) {
        const foundShelf = library.bookshelf.find((shelf: any) =>
          shelf.books.some((book: any) => book.id === bookId)
        );

        if (foundShelf) {
          return res.status(200).json({
            message: "Book found",
            shelf: foundShelf,
          });
        }
      }

      return res.status(404).json({ message: "Book not found in any shelf" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};
