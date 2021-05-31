require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

mongoose.connect(
  process.env.MONGODB_DEV_URL,
  { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, 
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`mongo connected sucessfully`);
      require("./config/routes")(app, express);
    }
  }
);

app.listen(3002, () => {
  console.log(`server listening on 3003`);
});
