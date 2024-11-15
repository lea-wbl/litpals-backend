"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    personalInfo: {
        username: { type: String },
        birthdate: {
            day: { type: String },
            month: { type: String },
            year: { type: String },
        },
        birthdatePrivate: { type: Boolean },
        accountType: {
            type: String,
            enum: ["reader", "author", "content-creator", "book-merch-maker"],
        },
        litMatchEnabled: { type: Boolean },
    },
    meetingInfo: {
        gender: { type: String },
        country: { type: String },
        city: { type: String },
        litMatchPreferences: {
            relationshipType: { type: String },
            communicationType: { type: String },
            genderPreference: { type: String },
        },
    },
    readingInfo1: {
        bookTypes: { type: (Array) },
        readingLanguages: { type: String },
        format: { type: String },
    },
    readingInfo2: {
        favoriteAuthors: { type: (Array) },
        favoriteGenres: {
            fiction: { type: (Array) },
            nonFiction: { type: (Array) },
        },
    },
    bookshelf: mongoose_1.Schema.Types.Mixed,
});
exports.default = (0, mongoose_1.model)("User", userSchema);
