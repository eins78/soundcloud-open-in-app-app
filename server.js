var express = require("express");
var logfmt = require("logfmt");
var request = require("request");

// init express app
var app = express();

// logs request for heroku logs
app.use(logfmt.requestLogger());

// serve home page
app.get('/', function(req, res) {
  var homepage = './index.html'
  res.sendfile(homepage);
});

// serve track-to-app-redirections
app.get(/\/go\/(.+)/, function(req, res) {
  var ScUrl = req.params[0];
  var ScAppUrl = "soundcloud://tracks:";
  
  var ApiUrl = 
    'http://api.soundcloud.com/resolve.json?' + 
    'url=' + ScUrl + 
    '&client_id=' + process.env.SC_client_id;
  
  console.log("Requesting " + ApiUrl);
  
  request({
      url: ApiUrl,
      json: true
    },
    function (err, apires, data) {
      
      console.log(apires, data);
      
      // check for errors, abort if any
      if (err || !data ) {
        return res.send("SoundCloud API error :(");
      }
      if (data.kind !== "track") {
        return res.send("Input is not a SoundCloud track :(");
      }
      if (!data.id) {
        return res.send("Could not find SoundCloud track id :(");
      }
      
      // redirect to soundcloud in-app-url
      res.redirect(ScAppUrl + data.id);
    }
  );
  
});

// listen on port from heroku or 5000
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
  console.log("SC id " + process.env.SC_client_id);
});
