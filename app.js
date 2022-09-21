const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
var $ = require("jquery");


const customerRoutes = require('./routes/customerRoute')
// const transferRoutes = require('./routes/transferRoute')
// const historyRoutes = require('./routes/historyRoute')

// const Customers = require("./models/customersSchema");
// const History = require("./models/historySchema");

//auto refresh

const path = require("path");

const livereload = require("livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
const { default: mongoose } = require("mongoose");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//Database connection
const mongo = require("mongoose");
mongo
  .connect(
    "mongodb+srv://Banky:123@cluster0.wmbhi.mongodb.net/BankDB?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT  || port, () => {
      console.log(`Example app listening on port at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("index");
});

// app.get("/index", (req, res) => {
//   res.render("index.ejs");
// });
app.use('/index',customerRoutes)

// app.use('/transfer',transferRoutes)



app.use((req, res) => {
  res.status(404).send("Sorry page not found !");
});
