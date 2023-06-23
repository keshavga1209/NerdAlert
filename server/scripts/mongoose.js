import dotenv from "dotenv";
// require the library
import mongoose from "mongoose";
// const mongoose = require("mongoose");
dotenv.config();
// mongoose.connect("mongodb://127.0.0.1/project-y"); // give any name to database
// mongoose.connect(
//     `mongodb://localhost:27017/Classroom`
// );
mongoose.connect(
    ``,
    { dbName: "projectkv" }
);

// acquire connection (to check if it is successful)
const db = mongoose.connection;

// if there's error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print message
db.once("open", function () {
    console.log("Successfully connected to database");
});
export default db;
