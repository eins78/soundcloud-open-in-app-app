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
app.get(/(.+)/, function(req, res) {

  sc.dataByUrl(req.params[0], function (err, data) {
    // abort on errors
    if (err) {
      return fail(res, err);
    }
    
    // redirect to soundcloud in-app-url
    res.redirect(data.appUrl);
  });
  
});

// listen on port from heroku or 5000
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
  console.log("SC id " + process.env.SC_client_id);
});

// FUNCTIONS

var sc = {
  dataByUrl: function (ScUrl, callback) {
    var ScAppUrl = "soundcloud://tracks:";
    var ApiUrl = 
      'http://api.soundcloud.com/resolve.json?' + 
      'url=' + 'http://soundcloud.com' + ScUrl + 
      '&client_id=' + process.env.SC_client_id;
  
    console.log("Requesting " + ApiUrl);
  
    request({
        url: ApiUrl,
        json: true
      },
      function (err, apires, data) {
      
        // console.log(apires, data);
      
        // check for errors, abort if any
        if (err || !data ) {
          return callback("SoundCloud API error :(");
        }
        if (data.kind !== "track") {
          return callback("Input is not a SoundCloud track :(");
        }
        if (!data.id) {
          return callback("Could not find SoundCloud track id :(");
        }
        
        data.appUrl = ScAppUrl + data.id;
        callback(null, data);
      
      }
    );
    
  }
};

var fail = function (res, str) {
  var msg = '<h1><kbd><b>404:</b> '+str+'</kbd></h1>';
  res.send(404, msg);
}