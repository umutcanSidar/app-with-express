import express from "express";
import AppRoutes from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const dotenv = require("dotenv").config();
const app = express();

mongoose.connect(
  "mongodb+srv://umutcansidar:Secode901@cluster0.edd4j.mongodb.net/test",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("REST API");
});

AppRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`The server has been started on ${process.env.PORT} port!`);
});
