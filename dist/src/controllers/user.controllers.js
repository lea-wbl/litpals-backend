"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
exports.userController = {
    createUser: async function (req, res) {
        const { personalInfo, meetingInfo, readingInfo1, readingInfo2, bookshelf } = req.body;
        // if (!username || !birthdate)
        //   res.status(400).json({ error: "Missing required field(s)" });
        try {
            const user = await user_models_1.default.create({
                personalInfo: {
                    username: personalInfo.username,
                    birthdate: {
                        day: personalInfo.birthdate.day,
                        month: personalInfo.birthdate.month,
                        year: personalInfo.birthdate.year,
                    },
                    birthdatePrivate: personalInfo.birthdatePrivate,
                    accountType: personalInfo.accountType,
                    litMatchEnabled: personalInfo.litMatchEnabled,
                },
                meetingInfo: {
                    gender: meetingInfo.gender,
                    country: meetingInfo.country,
                    city: meetingInfo.city,
                    litMatchPreferences: meetingInfo.litMatchPreferences,
                },
                readingInfo1: req.body.readingInfo1,
                readingInfo2: req.body.readingInfo2,
                bookshelf: req.body.bookshelf,
            });
            res.status(201).json({ user: user._id });
        }
        catch (error) {
            console.log(error);
        }
    },
};
