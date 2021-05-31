
const { timeStamp } = require('console');
const path = require('path')
const sharp = require("sharp")
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

sharp(path.resolve("uploads/"+workerData.filename))
  .rotate()
  .jpeg({quality:50}).toFile(path.resolve("uploads/test.jpeg"), (err,info)=>{
    if(err){
        console.log(err)
        parentPort.postMessage(err)
    }else{
        parentPort.postMessage("test.jpeg")
    }
  })