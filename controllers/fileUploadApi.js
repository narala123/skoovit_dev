const upload = require("../config/middlewares/multerConfig");
const path = require("path");
const sharp = require("sharp");
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
module.exports = (app,express)=>{
    let api = express.Router();
    api.post("/imageupload", (req,res)=>{
        upload.Imageupload(req,res,(err)=>{
            console.log(req.files);
            let promises = [];
            for(let i=0;i<req.files.length;i++){
                promises.push(imageWorkerInit(req.files.filename));
            }
            Promise.all(promises).then((data)=>{
                console.log(data)
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

    function imageWorkerInit(filename){
        new Promise((resolve,reject)=>{
            const worker = new Worker(path.resolve("workers/imageCompressorWorker.js"), {
                workerData: JSON.stringify({filename:filename,sharp:sharp})
              });
              worker.on('message', (data)=>{
                resolve(data)
              });
              worker.on('error', (err)=>{
                reject(data)
              });
              worker.on('exit', (code) => {
                if (code !== 0)
                  reject(new Error(`Worker stopped with exit code ${code}`));
              });
            });
    }

    return api;
}