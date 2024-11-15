import { Request, Response } from "express";
import userSchema from "../models/user.models";
import bookshelfSchema from "../models/bookshelf.models";

export const userController = {
  createUser: async function (req: Request, res: Response) {
    console.log("bfkjhdbncfikjnlksaejfqljelihnfgklhneilq");

    const { user, bookshelf } = req.body;

    // if (!username || !birthdate)
    //   res.status(400).json({ error: "Missing required field(s)" });

    try {
      const newBookshelf = new bookshelfSchema(bookshelf);
      console.log("new shelf", newBookshelf);
      const savedBookshelf = await newBookshelf.save();
      console.log("saved shelf", savedBookshelf);

      const newUser = new userSchema({
        ...user,
        bookshelf: savedBookshelf._id,
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
};
