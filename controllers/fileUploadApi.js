const upload = require("../config/middlewares/multerConfig");
const path = require("path");
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
module.exports = (app,express)=>{
    let api = express.Router();
    api.post("/imageupload", (req,res)=>{
        upload.Imageupload(req,res,(err)=>{
            console.log(req.files);
            let promises = [];
            imageWorkerInit(req.files).then(data=>{
                console.log("images",data);
            }).catch(err=>{ 
                console.log(err);
            })
        
           
        })
    })
    api.post("/videoupload", (req,res)=>{
        upload.Videoupload(req,res,(err)=>{
            console.log(err);
            console.log(req.files);
        })
       
    })

    api.post("/docupload", (req,res)=>{
        upload.docUpload(req,res,(err)=>{
            console.log(err);
            console.log(req.files);
        })
       
    })

    function imageWorkerInit(files){
        let threads = new Set();
        let fileNames = []
        return new Promise((resolve,reject)=>{
            for(let i=0;i<files.length;i++){
                    console.log(files[i]["originalname"].split(".")[1])
                  threads.add(new Worker(path.resolve("workers/imageCompressorWorker.js"), { workerData: { filename:files[i].filename, mimeType:files[i]["originalname"].split(".")[1],destFilname:Date.now()+"."+files[i].originalname.split(".")[1]}}));
            }
            for (let worker of threads) {
                worker.on('error', (err) => { 
                    console.log(err);
                    reject(err)
                  });
                // worker.on('exit', () => {
                //   threads.delete(worker);
                //   console.log(`Thread exiting, ${threads.size} running...`);
                // })
                worker.on('message', (msg) => {
                    fileNames.push(msg)
                });
              }
              resolve(fileNames);
            });
    }

    return api;
}