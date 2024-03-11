const multer=require("multer")
const fs=require('fs')
const path = require('path');
// const fileFilter = (req, file, cb) => {
//     // console.log("fileSize is:-", file.mimetype);
//     const allowMimeType=["image/jpeg","image/jpg"]
//     if (!allowMimeType.includes(file.mimetype)) {
//         return console.log("file type is not acceptable");
//         // return cb(new Error('Unsupported file type. Only JPEG, PNG, and GIF images are allowed.'), false);
//     } else {
//         cb(null, true);
//     }
// };

const uploadFolder = 'uploads/';
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the upload destination dynamically based on whether the folder exists or not
        const destination = path.join(__dirname, uploadFolder);
        cb(null, destination);
    },

    filename:(req,file,cb)=>{
        console.log("File is:-",file)
        cb(null,Date.now()+"-"+file.originalname)
    }
})

module.exports={multer:multer,storage:storage}

// multer.js
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads'); // Specify the destination folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// module.exports = {
//     storage: storage,
//     multer: multer,
// };
