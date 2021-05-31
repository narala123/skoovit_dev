
const path = require('path')
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
console.log("workerData",workerData);
let data = JSON.parse(workerData);
data.sharp(path.resolve("uploads/"+data.filename))
  .rotate()
  .jpeg({quality:50}).toFile(path.resolve("uploads/"+data.filename), (err,info)=>{
    if(err){
        console.log(err)
        parentPort.postMessage({err:err,data:null})
    }else{
        parentPort.postMessage({err:null,data:err})
    }
  })