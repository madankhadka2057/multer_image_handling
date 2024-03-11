const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Backend is active ",
  });
});
const { storage, multer } = require("./multer");
const uploads = multer({ storage: storage});
app.post("/upload_files", uploads.array("images"), (req, res) => {
  console.log(req.files);
  if(!req.file){
    res.status(400).json({
        message:"Unsupported file type. Only JPEG, PNG, and GIF images are allowed."
    })
  }
});

app.listen(3000, () => {
  console.log("Node is running on port 3000");
});
