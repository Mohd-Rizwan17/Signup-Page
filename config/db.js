// import { connect } from "mongoose";
// import { connection } from "mongoose";
// connect(process.env.MONGO_URL);

// const db = connection;

// db.on("connected", () => {
//   console.log("Database connected");
// });

// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL);

// const db = mongoose.connection;
// // hve to chck 2methods 1scnerio  db.on 1st parameter will b normal scnerio weather cooncn succes or not

// // happy path
// db.on("connected", () => {
//   console.log("Mongo DB connection successfull");
// });

// db.on("error", () => {
//   console.log("Mongo DB connection failed");
// });

import mongoose from "mongoose";

const dbConfig = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB connected ✅");

      mongoose.connection.on("connected", () => {
        console.log("Mongoose connected");
      });

      mongoose.connection.on("error", (err) => {
        console.log("Mongoose error: " + err);
      });
    })
    .catch((error) => {
      console.log("DB Error:", error);
    });
};

export default dbConfig;
