const ffmpeg = require('ffmpeg');
const fs = require("fs");
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const path = require('path');   

const spawn = require('child_process').spawn;

const args = [
    '-y', 
    '-i',path.resolve("uploads/"+workerData.filename),
    '-s', '640x1136', 
    '-codec:a', 'aac', 
    '-b:a', '44.1k', 
    '-r', '15', 
    '-b:v', '128k', 
    '-c:v','h264',
    '-seekable', 0, 
    '-f', 'mp4', path.resolve("uploads/"+workerData["destFilname"]+".mp4")
];

const proc = spawn('ffmpeg', args);

proc.stdout.on('data', function(data) {
    console.log("sdtdout",data);
});

proc.stderr.setEncoding("utf8")
proc.stderr.on('data', function(data) {
    //console.log("EERRPOR",data);
});

proc.on('close', function(code) {
    fs.unlink(path.resolve("uploads/"+workerData.filename),()=>{
    parentPort.postMessage({filename:workerData["destFilname"]+".mp4",originalName:workerData.orginalFileName, type:"video"});
    });
});
