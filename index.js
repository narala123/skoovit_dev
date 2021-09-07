require("dotenv").config();
const https = require('https');
const http = require('http');
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
//app.use(passport.session());
//app.use(session({secret:"thisissookvidev"}))
let credentials = {key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))};
//let httpsServer = https.createServer(credentials, app);
let httpServer = http.createServer(app)
const socket = new socketConfig(httpServer);
app.use(express.static(__dirname + "/public"));

function setMp4FileHeader(req,res,next){
  let urlArr = req.url.split(".");
     console.log("urlArr",urlArr);
  let fileType = urlArr[urlArr.length-1];
  if (fileType == "mp4") {
    let range = req.headers.range
    const videoSize = fs.statSync("uploads" + req.url).size;
    console.log("videoSize",videoSize);
    const CHUNK_SIZE = 10 ** 6; // 1MB

    var start = Number(range.replace(/\D/g, ""));
    console.log("start",start);
    var end = Math.min(start + CHUNK_SIZE, videoSize - 1);
     console.log("end",end);
    // Create headers
    const contentLength = end - start + 1;
    
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    // HTTP Status 206 for Partial Content
   // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream("uploads" + req.url, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
  }
  next();
}
function getfilePath(req,res){
 // req.addHeader("Range", "bytes=100-1500");
  res.sendFile(__dirname +"/uploads"+req.url,{acceptRanges: false});
}

app.use("/getvideofile",getfilePath)

app.use("/videostreaming",setMp4FileHeader)

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

httpServer.listen(process.env.PORT, () => {
  console.log(`server listening on ${process.env.PORT}`);
});
