require("dotenv").config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/middlewares/passportAuthentication");
const app = express();
const socketConfig = require("./chat/socket-config");
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret:"thisissookvidev"}))
let credentials = {key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))};
let httpsServer = https.createServer(credentials, app);
const socket = new socketConfig(httpsServer);
app.use(express.static(__dirname + "/public"));
app.use("/uploads",express.static(__dirname + "/uploads"));

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/public/index.html");
})


mongoose.connect(
  process.env.MONGODB_DEV_URL,
  { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, 
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`mongo connected sucessfully`);
      require("./config/routes")(app, express,passport);
    }
  }
);

httpsServer.listen(process.env.PORT, () => {
  console.log(`server listening on ${process.env.PORT}`);
});
