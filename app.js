//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const Article = require("./models/articleSchema");

// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoose
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://dbhani:dbhani2022@cluster0.rmvxom3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

app.get("/all-articles", (req, res) => {
  res.render("index");
});

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article");
});

app.post("/all-articles", (req, res) => {
  const article = new Article(req.body);

  console.log(req.body)

  article
    .save()
    .then((result) => {
      res.redirect("/all-articles");
    })
    .catch((err) => {
      console.log(err);
    });
});

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
