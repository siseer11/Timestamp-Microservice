// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//No params return with date.now()
app.get("/api/timestamp" , (req,res) => {
  //{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
  const date = new Date();
  res.status(200).json({
    "unix" : date.getTime(),
    "utc" : date.toGMTString()
  })
})

app.get("/api/timestamp/:date_string" , (req,res) => {

  let dateString = req.params.date_string;
  
  var timestamp = Date.parse(dateString);

  if (isNaN(dateString) && isNaN(timestamp)) {
    return res.status(400).json({"error" : "Invalid Date" })
  }
  
  if(!isNaN(dateString)){
   dateString = Number(dateString) 
  }
  
  const date = new Date(dateString)
  
  res.status(200).json({
    "unix" : date.getTime(),
    "utc" : date.toGMTString()
  })
  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});