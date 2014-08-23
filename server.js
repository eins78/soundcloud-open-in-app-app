var express = require("express");
var logfmt = require("logfmt");
var sc = require("./lib/soundcloud-api");

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

var fail = function (res, str) {
  var msg = '<h1><kbd><b>404:</b> '+str+'</kbd></h1>';
  res.send(404, msg);
}
