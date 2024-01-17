const express = require("express");
const app = express();
const port = 6000;

app.post("/api/thumbnail-upload", (req, res) => {
  console.log("req", req);
  res.send("Hello from Express server");
});

app.listen(port, () => {
  console.log("server is running at 6000");
});
