import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'
import path from 'path'
import db from './src/config/db'

import addressBook from "./src/routes/addressBook";
import backend from "./src/routes/backend";


// test db
db.authenticate()
  .then(() => {
    db.sync({force: true})
    console.log("DB connected")
  })
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


// routes
app.use("/", backend)
app.use("/api", addressBook);

app.listen(port, () => console.log(`Server running on port ${port}`));
