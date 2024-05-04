const multer = require("multer");
const express = require('express');
const FileRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/images/uploads")
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}_pic_${file.originalname.toLowerCase()}`);
    },
});

const uploadImg = multer({
    storage: storage
});

FileRouter.post('/uploadpic', uploadImg.single('ImgFile'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send(`${req.file.filename}`);
});

module.exports = FileRouter;