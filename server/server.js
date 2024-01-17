const express = require("express");
const multer = require("multer");
const app = express();
const port = 6000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/thumbnail-upload", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log("file", file);
  res.send("Hello from Express server");
});

app.listen(port, () => {
  console.log("server is running at 6000");
});
