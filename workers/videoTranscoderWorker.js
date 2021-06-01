const ffmpeg = require('ffmpeg');
const fs = require("fs");
// const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const path = require('path');   

var spawn = require('child_process').spawn;

//var cmd = 'usr/local/Cellar/ffmpeg';

var args = [
    '-y', 
    '-i',path.resolve("uploads/1.mp4"),
    '-s', '640x480', 
    '-codec:a', 'aac', 
    '-b:a', '44.1k', 
    '-r', '15', 
    '-b:v', '512k', 
    '-c:v','h264', 
    '-f', 'mp4', path.resolve("uploads/8.mp4")
];

var proc = spawn('ffmpeg', args);

proc.stdout.on('data', function(data) {
    console.log(data);
});

proc.stderr.setEncoding("utf8")
proc.stderr.on('data', function(data) {
    console.log("EERRPOR",data);
});

proc.on('close', function() {
    console.log('finished');
});
// try {
// 	new ffmpeg(path.resolve("uploads/"+workerData.filename), function (err, video) {
// 		if (!err) {
// 			video
// 		.setVideoSize('640x?', true, true, '#fff')
// 		.setAudioCodec('libfaac')
// 		.setAudioChannels(2)
// 		.save(path.resolve("uploads/"+workerData.destFilname), function (error, file) {
// 			if (!error)
//                 console.log('Video file: ' + file);
//                 parentPort.postMessage(path.resolve("uploads/"+workerData.destFilname))
// 		});
// 		} else {
// 			console.log('Error: ' + err);
// 		}
// 	});
// } catch (e) {
// 	console.log(e.code);
// 	console.log(e.msg);
// }