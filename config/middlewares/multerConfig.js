const multer = require("multer");
const constant = require("../constants");
const fs =  require("fs");
class MulterConfg {
    constructor(){
        this.Imageupload = multer({storage: this.destinationStorage()}).array('image');
        this.Videoupload = multer({storage: this.destinationStorage()}).array('video');
        this.docUpload = multer({storage: this.destinationStorage()}).array('doc');
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