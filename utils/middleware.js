const util = require("util");
const multer = require("multer");
const path = require('path');
const config = require('../config');
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, path.join(__dirname, '../routes'));
        cb(null, config.storagePath);
    },
    filename: (req, file, cb) => {
        let uploadFileName = file.originalname.replace(path.extname(file.originalname), "")
            + Date.now() + path.extname(file.originalname);
        // uploadFileName = file.originalname;
        console.log(uploadFileName);
        cb(null, uploadFileName);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let middleware = util.promisify(uploadFile);
module.exports = middleware;