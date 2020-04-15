const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());
// Helper for handling file POST request
app.use(fileUpload());
app.use("/public", express.static(__dirname + "/public"));



app.post('/single-file', (req, res, next) => {
  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  console.log(fileName);

  uploadFile.mv(`./uploads/${fileName}`, function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
  // Handle File and send result back to client-side
});

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(8081, function() {
  console.log("Listening on port " + 8081); //Listening on port 8888
});

module.exports = app