import mongoose from "mongoose";
const DATABSE_URL = process.env.MONGODB_URI;

if (DATABSE_URL) {
  mongoose
    .connect(DATABSE_URL, {
      autoIndex: true,
      dbName: "MUSIC-LIST-API",
    })
    .then((db) => console.log("DB is connect MUSIC-API"))
    .catch((err) => console.log(err));
}
