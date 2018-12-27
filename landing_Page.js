//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();
app.use(bodyParser.json()); // to support JSON bodie
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var nam = req.body.in_Name;
  var mail = req.body.in_Email;
  var sex;
  if (req.body.in_Male == "Male")
  {
    sex = "Male";
  }
  if (req.body.in_Female == "Female")
  {
    sex = "Female";
  }
  console.log(nam + mail + sex);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://l3f3ds1nn1.execute-api.ap-southeast-1.amazonaws.com/deploy/landing-page');
  xhr.onreadystatechange = function(event) {
    if (xhr.readyState === 4)
    {
      console.log(xhr.responseText);
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({name: nam, email: mail, gender: sex}));
  res.redirect("/#interest");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
