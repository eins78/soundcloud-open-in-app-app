var request= require("request");

var scTypeMap = {
  // kind: route
  track: 'tracks',
  playlist: 'sets'
};

var routeByKind = function (kind) {
  return scTypeMap[kind];
}

module.exports = {
  dataByUrl: function (ScUrl, callback) {
    var ScAppUrl = "soundcloud://";
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
        // fail if we can't handle this kind of item
        if (!routeByKind(data.kind)) {
          return callback("Input is not a SoundCloud "+
            Object.keys(scTypeMap).slice(0,-1).join(', ')+
            ' or '+Object.keys(scTypeMap).slice(-1)+
            " :(");
        }
        if (!data.id) {
          return callback("Could not find SoundCloud id :(");
        }
        
        data.appUrl = ScAppUrl + routeByKind(data.kind) + ':' + data.id;
        callback(null, data);
      
      }
    );
    
  }
};
