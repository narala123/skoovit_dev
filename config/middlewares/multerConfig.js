const multer = require("multer");
const constant = require("../constants");
const fs =  require("fs");
const path = require("path");
class MulterConfg {
    constructor(){
        this.Imageupload = multer({storage: this.destinationStorage(), fileFilter:this.filterImage}).array('image');
        this.Videoupload = multer({storage: this.destinationStorage(), fileFilter:this.filterVideo}).array('video');
        this.docUpload = multer({storage: this.destinationStorage(),fileFilter:this.filterdoc, limits:{fieldSize:1*1024*1024}}).array('doc');
        this.audioUpload = multer({storage: this.destinationStorage()}).array('audio');
        this.ImgVideoUpload = multer({storage: this.destinationStorage()}).array('image');
    }

    destinationStorage(){
        if(!fs.existsSync(constant.DESTINATION_FOLDER)){
            fs.mkdirSync(constant.DESTINATION_FOLDER)
            }
        return multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, constant.DESTINATION_FOLDER)
            },
            filename: function (req, file, cb) {
              file.extname = "."+file.originalname.split('.')[1]
              cb(null, Date.now()+"."+file.originalname.split('.')[1])
            }
          })
    };
  filterImage(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  }
  filterVideo(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.mp4' && ext !== '.avi' && ext !== '.mov') {
      return callback(new Error('Only videos are allowed'))
    }
    callback(null, true)
  }
  filterdoc(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      return callback(new Error('Only pdfs are allowed'))
    }
    callback(null, true)
  }
}

module.exports = new MulterConfg();