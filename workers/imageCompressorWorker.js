
const { timeStamp } = require('console');
const path = require('path');
const sharp = require("sharp");
const fs = require("fs");
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
if(workerData.mimeType == "jpeg"){
sharp(path.resolve("uploads/"+workerData.filename))
  .rotate()
  .jpeg({quality:50}).toFile(path.resolve("uploads/"+workerData.destFilname), (err,info)=>{
    if(err){
        console.log(err)
        parentPort.postMessage(err)
    }else{ 
      fs.unlink(path.resolve("uploads/"+workerData.filename),()=>{
        parentPort.postMessage(workerData.destFilname);
      })
      
      
    }
  })
}else{
  sharp(path.resolve("uploads/"+workerData.filename))
  .rotate()
  .png({quality:50}).toFile(path.resolve("uploads/"+workerData.destFilname), (err,info)=>{
    if(err){
        console.log(err)
        parentPort.postMessage(err)
    }else{
      fs.unlink(path.resolve("uploads/"+workerData.filename),()=>{
        parentPort.postMessage(workerData.destFilname);
      })
    }
  })
}