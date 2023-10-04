import express from "express";

const port = 8000;
const app = express();

app.get("/", (req, res) => {
  console.log("test express");
  res.send("Hello from Express");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
