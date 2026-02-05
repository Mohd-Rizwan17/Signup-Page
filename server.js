// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// // import dbConfig from "./config/db.js";
// require("dotenv").config();

// // dotenv.config();

// const app = express();

// dbConfig();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listening on port ${port}`));

// es6
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConfig from "./config/db.js";
// import addTestUser from "./Utils/testUsers.js"; // sample test
import userRouter from "./routes/userRoutes.js";

dotenv.config();

// addTestUser();
const app = express();

dbConfig();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// call this to get all the users
app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
