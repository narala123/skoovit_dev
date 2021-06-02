const multer = require("multer");
const constant = require("../constants");
const fs =  require("fs");
class MulterConfg {
    constructor(){
        this.imageUpload = multer({storage: this.destinationStorage()}).array('image');
        this.videoUpload = multer({storage: this.destinationStorage()}).array('video');
        this.docUpload = multer({storage: this.destinationStorage(),limits:{fileSize:1000}}).array('doc');
        this.audioUpload = multer({storage: this.destinationStorage()}).array('audio');
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
              cb(null, Date.now()+"."+file.originalname.split('.')[1])
            }
          })
    }
}

module.exports = new MulterConfg();