import express from "express";
import mongoose from "mongoose";
import Url from "./models/Url";
import shortid from "shortid";
import validUrl from "valid-url";
const app = express();
app.use(express.static("static"));
app.use(express.json());
app.post("/url", async (req, res) => {
  //   console.log("I got request");
  //   console.log(req.body.longUrl);
  console.log(req.body.longUrl);
  console.log(shortid.generate());
  const sUrl = shortid.generate();
  console.log(Date.now);
  console.log(typeof Url);

  await new Url({
    longUrl: req.body.longUrl,
    shortUrl: sUrl,
    date: "date"
  })
    .save()
    .then(() => {
      console.log("Url saved Succesfully");
      res.json(sUrl);
    });
});

app.get("/:shortUrl", async (req, res) => {
  console.log(req.params.shortUrl);

  const short = req.params.shortUrl;
  if (!validUrl.isUri(short)) {
    // console.log("Looks like an URI");
    const actualUrl: any = await Url.findOne({ shortUrl: short });
    console.log(typeof actualUrl);
    if (!actualUrl) {
      res.status(404).json("Url not Found");
      return;
    }
    console.log(actualUrl.longUrl);
    res.redirect(actualUrl.longUrl);
  } else {
    res.redirect(short);
  }
});
mongoose
  .connect(
    "mongodb+srv://Devansh:Devansh@cluster0-ixpyc.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to db");
    app.listen(3000, () => console.log("listening on Port 3000...."));
  });
