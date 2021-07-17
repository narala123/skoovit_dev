const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require("path");
const sharp = require("sharp");

class ImageVideoWorkerInitService {
    constructor() {
      
    }
    async imageWorkerInit(files){
        return new Promise((resolve, reject) => {
            let worker = new Worker(path.resolve("workers/imageCompressorWorker.js"), { workerData: { filename: files.filename, mimeType: files["originalname"].split(".")[files["originalname"].split(".").length - 1], destFilname: Date.now() + "." + files.originalname.split(".")[files["originalname"].split(".").length - 1], orginalFileName: files["originalname"] } });
            worker.on('error', (err) => {
                console.log(err);
                reject(err)
            });
            worker.on('exit', (code) => {
                if (code != 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                } else {
                    worker.terminate();
                }
            })
            worker.on('message', (msg) => {
                resolve(msg)
            });

        });
    };
    async videoWorkerInit(files) {
        return new Promise((resolve, reject) => {
            let worker = new Worker(path.resolve("workers/videoTranscoderWorker.js"), { workerData: { filename: files.filename, mimeType: files["originalname"].split(".")[files["originalname"].split(".").length - 1], destFilname: Date.now(), orginalFileName: files["originalname"] } });
            worker.on('error', (err) => {
                console.log(err);
                reject(err)
            });
            worker.on('exit', (code) => {
                if (code != 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                } else {
                    worker.terminate();
                }
            })
            worker.on('message', (msg) => {
                resolve(msg)
            });
        });
    };
}
module.exports = new ImageVideoWorkerInitService();
